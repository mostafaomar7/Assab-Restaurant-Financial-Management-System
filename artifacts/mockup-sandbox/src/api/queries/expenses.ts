import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../client";
import type {
  AssetDraft,
  ExpenseKpis,
  ReviewInvoiceResponse,
  VerifyInvoiceResponse,
} from "../types/company";
import { getErrorMessage } from "../errors";
import { queryKeys } from "./keys";

// ─── Expenses KPI strip (T05 §2) ─────────────────────────────────────────────
export function useExpensesKpis(params: { dateFrom?: string; dateTo?: string } = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  );
  return useQuery({
    queryKey: queryKeys.expensesKpis(params),
    queryFn: async () => {
      const res = await api.get<ExpenseKpis>("/company/me/expenses/kpis", {
        params: clean,
      });
      return res.data;
    },
    staleTime: 15_000,
  });
}

// ─── Invoice attachments (T05 §5) ────────────────────────────────────────────
export function useExpenseInvoiceAttachments(
  invoiceId: string | null | undefined,
  invoiceIndex?: number,
) {
  return useQuery({
    queryKey: queryKeys.expenseInvoiceAttachments(invoiceId ?? "", invoiceIndex),
    enabled: Boolean(invoiceId),
    queryFn: async () => {
      const res = await api.get<unknown>(
        `/company/me/expense-invoices/${invoiceId}/attachments`,
        { params: invoiceIndex != null ? { invoiceIndex } : undefined },
      );
      return res.data;
    },
  });
}

// ─── توثيق — verify / unverify one invoice (T05 §3) ⚠️ idempotent ────────────
export function useVerifyExpenseInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      invoiceIndex = 0,
    }: {
      invoiceId: string;
      invoiceIndex?: number;
    }) => {
      const res = await api.post<VerifyInvoiceResponse>(
        `/company/me/expense-invoices/${invoiceId}/verify`,
        { invoiceIndex },
      );
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.operation(data.operationId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: ["expenses", "kpis"] });
      toast.success("تم توثيق الفاتورة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useUnverifyExpenseInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      invoiceIndex = 0,
    }: {
      invoiceId: string;
      invoiceIndex?: number;
    }) => {
      const res = await api.delete<VerifyInvoiceResponse>(
        `/company/me/expense-invoices/${invoiceId}/verify`,
        { data: { invoiceIndex } },
      );
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.operation(data.operationId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: ["expenses", "kpis"] });
      toast.success("تم إلغاء التوثيق");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Review modal — record the attached document (T05 §4) ⚠️ idempotent ──────
export function useReviewExpenseInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      invoiceIndex,
      ...body
    }: {
      invoiceId: string;
      invoiceIndex: number;
      documentAmountHalalas?: number | null;
      documentVendor?: string | null;
      documentInvNum?: string | null;
      documentDate?: string | null;
    }) => {
      const res = await api.patch<ReviewInvoiceResponse>(
        `/company/me/expense-invoices/${invoiceId}/invoices/${invoiceIndex}`,
        body,
      );
      return res.data;
    },
    onSuccess: (_data, { invoiceId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.operation(invoiceId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      qc.invalidateQueries({ queryKey: ["expenses", "kpis"] });
      toast.success("تم حفظ المراجعة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Convert an invoice to an asset draft (wizard, T05 §6) ⚠️ idempotent ─────
export interface ConvertToAssetDraftPayload {
  invoiceId: string;
  invoiceIndex?: number;
  assetName: string;
  category: string;
  usefulLifeMonths: number;
  targetBranches: string[];
  custodian: string;
  qty: number;
  notes?: string;
  amount?: number;
}

export function useConvertToAssetDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ invoiceId, ...body }: ConvertToAssetDraftPayload) => {
      const res = await api.post<AssetDraft>(
        `/company/me/expense-invoices/${invoiceId}/convert-to-asset-draft`,
        body,
      );
      return res.data;
    },
    onSuccess: (_draft, { invoiceId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.assetDrafts });
      qc.invalidateQueries({ queryKey: ["assets"] });
      qc.invalidateQueries({ queryKey: queryKeys.operation(invoiceId) });
      qc.invalidateQueries({ queryKey: ["operations"] });
      toast.success("تم تحويل الفاتورة إلى مسودة أصل");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
