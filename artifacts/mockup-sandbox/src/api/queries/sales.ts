import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api, downloadBlob } from "../client";
import type { Operation } from "../types";
import type {
  DayCompletenessEntry,
  SalesDetailsPatchPayload,
  SalesDetailsPatchResponse,
  SalesKpis,
  SalesVarianceAssignPayload,
  SalesVarianceAssignResult,
} from "../types/company";
import { getErrorMessage } from "../errors";
import { queryKeys } from "./keys";
import { useOperation } from "./operations";

// ─── Reconciliation (rides on the operation-detail response, T04 §4) ─────────
// There is no separate GET sales-details endpoint — the `reconciliation` block
// arrives on `GET /operations/{id}`. This wrapper keeps the old ergonomics.
export function useSalesDetails(operationId: string | null | undefined) {
  const query = useOperation(operationId);
  return {
    ...query,
    reconciliation: query.data?.reconciliation ?? null,
  };
}

export function usePatchSalesDetails() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      operationId,
      payload,
    }: {
      operationId: string;
      payload: SalesDetailsPatchPayload;
    }) => {
      const res = await api.patch<SalesDetailsPatchResponse>(
        `/company/me/operations/${operationId}/sales-details`,
        payload,
      );
      return res.data;
    },
    onSuccess: (data, { operationId }) => {
      // Fold the fresh reconciliation + re-derived match into the cached op detail.
      qc.setQueryData<Operation>(queryKeys.operation(operationId), (prev) =>
        prev
          ? { ...prev, reconciliation: data.reconciliation, match: data.match }
          : prev,
      );
      qc.invalidateQueries({ queryKey: queryKeys.operation(operationId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      toast.success("تم حفظ التسوية");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useAssignSalesVariance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      operationId,
      payload,
    }: {
      operationId: string;
      payload: SalesVarianceAssignPayload;
    }) => {
      const res = await api.post<SalesVarianceAssignResult>(
        `/company/me/operations/${operationId}/sales-variance/assign`,
        payload,
      );
      return res.data;
    },
    onSuccess: (_data, { operationId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.operation(operationId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      toast.success("تم تحميل الفرق على الموظفين");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Sales KPIs + variance banner (T04 §2) ──────────────────────────────────
export function useSalesKpis(date?: string) {
  return useQuery({
    queryKey: queryKeys.salesKpis(date),
    queryFn: async () => {
      const res = await api.get<SalesKpis>("/company/me/sales/kpis", {
        params: date ? { date } : undefined,
      });
      return res.data;
    },
    staleTime: 15_000,
  });
}

// ─── Day completeness (day pills, T04 §3) ────────────────────────────────────
export function useSalesDayCompleteness(days = 7) {
  return useQuery({
    queryKey: queryKeys.dayCompleteness(days),
    queryFn: async () => {
      const res = await api.get<
        { data: DayCompletenessEntry[] } | DayCompletenessEntry[]
      >("/company/me/sales/day-completeness", { params: { days } });
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
    staleTime: 30_000,
  });
}

// ─── Exports ─────────────────────────────────────────────────────────────────
export function useExportOperationDetail() {
  return useMutation({
    mutationFn: async ({
      operationId,
      filename,
    }: {
      operationId: string;
      filename?: string;
    }) => {
      await downloadBlob(
        `/company/me/operations/${operationId}/export`,
        filename ?? `operation-${operationId}.xlsx`,
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// Bulk module export — sales/expenses/purchases via the same endpoint.
export interface OperationsExportFilter {
  moduleKey?: "sales" | "expenses" | "purchases" | "inventory" | "shifts" | "employees" | "cash" | "waste";
  format?: "xlsx" | "csv";
  dateFrom?: string;
  dateTo?: string;
  brandId?: string;
  branchId?: string;
  status?: string;
}

export function useExportOperations() {
  return useMutation({
    mutationFn: async (filter: OperationsExportFilter = {}) => {
      const fmt = filter.format ?? "xlsx";
      const filename = `operations-${filter.moduleKey ?? "all"}.${fmt}`;
      await downloadBlob(
        "/company/me/operations/export",
        filename,
        { ...filter, format: fmt },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// Head-side bulk export (filter by pipeline status across modules).
export function useExportHeadOperations() {
  return useMutation({
    mutationFn: async (
      filter: { status?: string; moduleKey?: string; format?: "xlsx" | "csv"; dateFrom?: string; dateTo?: string; brandId?: string } = {},
    ) => {
      const fmt = filter.format ?? "xlsx";
      const filename = `head-operations-${filter.status ?? "all"}.${fmt}`;
      await downloadBlob("/operations/export", filename, { ...filter, format: fmt });
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
