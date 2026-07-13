import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api, downloadBlob } from "../client";
import type {
  WasteClassification,
  WasteEmpAlloc,
  WasteEntry,
  WasteListSummary,
  WasteResponsibility,
} from "../types/company";
import { getErrorMessage } from "../errors";
import { queryKeys, type WasteFilter } from "./keys";

// ─── Waste list (T07 §4) — { data[], meta: { …, summary } } ──────────────────
export interface WasteListResponse {
  data: WasteEntry[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages?: number;
    summary?: WasteListSummary;
  };
}

export function useWaste(filter: WasteFilter = {}) {
  const clean = Object.fromEntries(
    Object.entries(filter).filter(([, v]) => v !== undefined && v !== "" && v !== "all"),
  );
  return useQuery({
    queryKey: queryKeys.waste(filter),
    queryFn: async () => {
      const res = await api.get<WasteListResponse>("/company/me/waste", {
        params: clean,
      });
      return res.data;
    },
  });
}

// ─── Classify (T07 §5) — Arabic enum values, هدر/تالف · موظف/مطعم ─────────────
export function usePatchWasteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      productIdx,
      patch,
    }: {
      entryId: string;
      productIdx: number;
      patch: {
        classification?: WasteClassification | string;
        responsibility?: WasteResponsibility | string;
      };
    }) => {
      const res = await api.patch<WasteEntry>(
        `/company/me/waste/${entryId}/products/${productIdx}`,
        patch,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["waste"] });
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Allocations (T07 §6) — empAllocs must sum to product value for «موظف» ───
export function usePutWasteAllocations() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      productIdx,
      empAllocs,
    }: {
      entryId: string;
      productIdx: number;
      empAllocs: WasteEmpAlloc[];
    }) => {
      const res = await api.put<WasteEntry>(
        `/company/me/waste/${entryId}/products/${productIdx}/allocations`,
        { empAllocs },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["waste"] });
      toast.success("تم حفظ التوزيع");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useApproveWaste() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (entryId: string) => {
      const res = await api.post<WasteEntry>(
        `/company/me/waste/${entryId}/approve`,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["waste"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      toast.success("تم اعتماد سجل الهدر");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useRejectWaste() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      entryId,
      reason,
      notes,
    }: {
      entryId: string;
      reason: string;
      notes?: string;
    }) => {
      const res = await api.post<WasteEntry>(
        `/company/me/waste/${entryId}/reject`,
        { reason, notes },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["waste"] });
      toast.success("تم رفض السجل");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// T07 §7 — bulk body accepts `{ entryIds }` OR `{ branchId }` (all pending of a branch).
export function useBulkApproveWaste() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      arg: string[] | { entryIds?: string[]; branchId?: string },
    ) => {
      const body = Array.isArray(arg) ? { entryIds: arg } : arg;
      const res = await api.post<{
        approved: string[];
        failed: Array<{ id: string; code: string }>;
      }>("/company/me/waste/bulk-approve", body);
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["waste"] });
      qc.invalidateQueries({ queryKey: queryKeys.accDashboard });
      if ((data.failed?.length ?? 0) > 0) {
        toast.warning(`تم اعتماد ${data.approved.length} وفشل ${data.failed.length}`);
      } else {
        toast.success(`تم اعتماد ${data.approved.length} سجل`);
      }
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// T07 §10 — binary stream, both surfaces, scope-guarded.
export function useExportWaste() {
  return useMutation({
    mutationFn: async (
      filter: WasteFilter & { format?: "xlsx" | "csv" } = {},
    ) => {
      const fmt = filter.format ?? "xlsx";
      await downloadBlob("/company/me/waste/export", `waste.${fmt}`, {
        ...filter,
        format: fmt,
      });
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
