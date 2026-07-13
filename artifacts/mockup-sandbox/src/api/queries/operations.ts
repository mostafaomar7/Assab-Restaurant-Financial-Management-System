import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../client";
import type { AuditEvent, Operation, Page } from "../types";
import type { OperationAttachment } from "../types/company";
import { getErrorMessage } from "../errors";
import { queryKeys, type OperationsFilter } from "./keys";

// ─── List operations ─────────────────────────────────────────────────────────
// Canonical path per T03: bare `/operations` (the `/company/me/operations`
// copy is an accountant-surface alias to the same handler — prefer canonical).
export function useOperations(filter: OperationsFilter = {}) {
  return useQuery({
    queryKey: queryKeys.operations(filter),
    queryFn: async () => {
      const res = await api.get<Page<Operation>>("/operations", {
        params: cleanFilter(filter),
      });
      return res.data;
    },
  });
}

// ─── Single operation + audit trail ──────────────────────────────────────────
export function useOperation(id: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.operation(id ?? ""),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await api.get<Operation>(`/operations/${id}`);
      return res.data;
    },
  });
}

export function useAuditTrail(operationId: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.operationAudit(operationId ?? ""),
    enabled: Boolean(operationId),
    queryFn: async () => {
      const res = await api.get<AuditEvent[]>(
        `/operations/${operationId}/audit-trail`,
      );
      return res.data;
    },
  });
}

// ─── Approve / Reject / Bulk approve / Final approve ─────────────────────────
export function useApproveOperation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note?: string }) => {
      const res = await api.post<Operation>(`/operations/${id}/approve`, { note });
      return res.data;
    },
    onSuccess: (op) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      qc.invalidateQueries({ queryKey: queryKeys.operationAudit(op.id) });
      toast.success("تم اعتماد العملية");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useRejectOperation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      reason,
      notes,
    }: {
      id: string;
      reason: string;
      notes?: string;
    }) => {
      const res = await api.post<Operation>(`/operations/${id}/reject`, {
        reason,
        notes,
      });
      return res.data;
    },
    onSuccess: (op) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      qc.invalidateQueries({ queryKey: queryKeys.operationAudit(op.id) });
      toast.success("تم رفض العملية");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Request clarification (non-terminal — status is unchanged) ─────────────
export function useRequestClarification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, message }: { id: string; message: string }) => {
      const res = await api.post<Operation>(
        `/operations/${id}/request-clarification`,
        { message },
      );
      return res.data;
    },
    onSuccess: (op) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.operationAudit(op.id) });
      toast.success("تم إرسال طلب التوضيح");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useBulkApprove() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      operationIds,
      note,
    }: {
      operationIds: string[];
      note?: string;
    }) => {
      const res = await api.post<{
        approved: string[];
        failed: Array<{ id: string; code: string }>;
      }>("/operations/bulk-approve", { operationIds, note });
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      if (data.failed.length === 0) {
        toast.success(`تم اعتماد ${data.approved.length} عملية`);
      } else {
        toast.warning(
          `تم اعتماد ${data.approved.length} وفشلت ${data.failed.length}`,
        );
      }
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useFinalApprove() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isConditional,
      conditionalNote,
      conditions,
    }: {
      id: string;
      isConditional?: boolean;
      conditionalNote?: string;
      conditions?: Array<{ text: string; dueAt?: string }>;
    }) => {
      const res = await api.post<Operation>(`/operations/${id}/final-approve`, {
        isConditional,
        conditionalNote,
        conditions,
      });
      return res.data;
    },
    onSuccess: (op) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      qc.invalidateQueries({ queryKey: queryKeys.operationAudit(op.id) });
      toast.success("تم الاعتماد النهائي");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Corrective operation (create a new op linked to a rejected/posted one) ──
export function useCorrectOperation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...body
    }: { id: string } & Record<string, unknown>) => {
      const res = await api.post<Operation>(
        `/operations/${id}/correction`,
        body,
      );
      return res.data;
    },
    onSuccess: (op) => {
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: queryKeys.operationAudit(op.id) });
      toast.success("تم إنشاء عملية تصحيح");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Attachments (T04 §9) ────────────────────────────────────────────────────
export function useOperationAttachments(id: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.operationAttachments(id ?? ""),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await api.get<
        { data: OperationAttachment[]; meta?: { total: number } } | OperationAttachment[]
      >(`/operations/${id}/attachments`);
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function cleanFilter<T extends object>(f: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(f)) {
    if (v !== undefined && v !== null && v !== "" && v !== "all") {
      out[k] = v;
    }
  }
  return out as Partial<T>;
}
