import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api, downloadBlob } from "../client";
import { getErrorMessage } from "../errors";
import { queryKeys } from "./keys";

export interface ReportCatalogItem {
  key: string;
  title: string;
  titleEn: string;
  description: string;
  category: "financial" | "operational" | "owner";
  availableFormats: ("pdf" | "xlsx" | "csv")[];
}

export function useReports() {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: async () => {
      const res = await api.get<ReportCatalogItem[]>("/company/me/reports");
      return res.data;
    },
    staleTime: 60_000,
  });
}

// ─── Individual report generators (shared §5 in BACKEND_API_SPEC) ───────────
export type ReportKey =
  | "profit-loss"
  | "sales-summary"
  | "expense-summary"
  | "inventory-valuation"
  | "payroll"
  | "waste-analysis"
  | "supplier-performance"
  | "menu-engineering"
  | "breakeven"
  | "cash-flow";

// T15.1/T15.7 — typed report request. All fields optional; role-gated to
// accountant/head/company-admin server-side (branch/procurement/supplier → 403).
export interface TypedReportBody {
  from?: string;
  to?: string;
  branchIds?: string[];
}

export interface TypedReportResult {
  reportId: string;
  generatedAt: string;
  data: Record<string, unknown>;
  downloadUrl: string | null;
}

function makeReportGenerator(key: ReportKey) {
  return function useGenerate() {
    return useMutation({
      mutationFn: async (body: TypedReportBody = {}) => {
        const res = await api.post<TypedReportResult>(`/reports/${key}`, body);
        return res.data;
      },
      onError: (e) => toast.error(getErrorMessage(e, "ar")),
    });
  };
}

export const useGenerateProfitLossReport = makeReportGenerator("profit-loss");
export const useGenerateSalesSummaryReport = makeReportGenerator("sales-summary");
export const useGenerateExpenseSummaryReport = makeReportGenerator("expense-summary");
export const useGenerateInventoryValuationReport = makeReportGenerator("inventory-valuation");
export const useGeneratePayrollReport = makeReportGenerator("payroll");
export const useGenerateWasteAnalysisReport = makeReportGenerator("waste-analysis");
export const useGenerateSupplierPerformanceReport = makeReportGenerator("supplier-performance");
export const useGenerateMenuEngineeringReport = makeReportGenerator("menu-engineering");
export const useGenerateBreakevenReport = makeReportGenerator("breakeven");
export const useGenerateCashFlowReport = makeReportGenerator("cash-flow");

export function useDownloadReport() {
  return useMutation({
    mutationFn: async ({
      key,
      format = "pdf",
      filename,
    }: {
      key: string;
      format?: "pdf" | "xlsx" | "csv";
      filename?: string;
    }) => {
      await downloadBlob(
        `/company/me/reports/${key}/download`,
        filename ?? `${key}.${format}`,
        { format },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// T15.5 — mark a distributed report as viewed (read receipt). Any company role;
// foreign-tenant id → 404. Response { id, viewed:true, viewedAt }.
export function useMarkReportDistributionViewed() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post<{ id: string; viewed: boolean; viewedAt?: string }>(
        `/company/me/reports/distributions/${id}/viewed`,
      );
      return res.data;
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
