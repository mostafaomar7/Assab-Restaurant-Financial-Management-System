import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api, downloadBlob, type Page } from "../../client";
import { getErrorMessage } from "../../errors";
import type {
  SupplierItem,
  SupplierOrder,
  SupplierOverview,
  SupplierReports,
} from "../../types/platform";
import { queryKeys, type SupplierOrdersFilter } from "../keys";

// ─── Overview ───────────────────────────────────────────────────────────────
export function useSupplierOverview() {
  return useQuery({
    queryKey: queryKeys.supplierOverview,
    queryFn: async () => {
      const res = await api.get<SupplierOverview>("/asab/supplier/overview");
      return res.data;
    },
    staleTime: 15_000,
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────
export function useSupplierOrders(filter: SupplierOrdersFilter = {}) {
  return useQuery({
    queryKey: queryKeys.supplierOrders(filter),
    queryFn: async () => {
      const res = await api.get<Page<SupplierOrder> | SupplierOrder[]>(
        "/asab/supplier/orders",
        { params: filter },
      );
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

export function useAcceptSupplierOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...body
    }: { id: string } & Record<string, unknown>) => {
      const res = await api.post<SupplierOrder>(
        `/asab/supplier/orders/${id}/accept`,
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "orders"] });
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "overview"] });
      toast.success("تم قبول الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useRejectSupplierOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      reason,
      note,
    }: {
      id: string;
      reason: string; // required, ≤500 chars (T13 §4)
      note?: string;
    }) => {
      const res = await api.post<SupplierOrder>(
        `/asab/supplier/orders/${id}/reject`,
        { reason, note },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "orders"] });
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "overview"] });
      toast.success("تم رفض الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useMarkSupplierOrderDelivered() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...body
    }: { id: string } & Record<string, unknown>) => {
      const res = await api.post<SupplierOrder>(
        `/asab/supplier/orders/${id}/mark-delivered`,
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "orders"] });
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "overview"] });
      toast.success("تم تأكيد التسليم");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Reports ────────────────────────────────────────────────────────────────
export function useSupplierReports() {
  return useQuery({
    queryKey: queryKeys.supplierReports,
    queryFn: async () => {
      const res = await api.get<SupplierReports>("/asab/supplier/reports");
      return res.data;
    },
  });
}

// ─── Items ──────────────────────────────────────────────────────────────────
export function useSupplierItems() {
  return useQuery({
    queryKey: queryKeys.supplierItems,
    queryFn: async () => {
      const res = await api.get<Page<SupplierItem> | SupplierItem[]>(
        "/asab/supplier/items",
      );
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

// Write body: prefer `priceSar` (riyals — matches the «السعر (ر.س)» field);
// `price`/`priceHalalas` (halalas) stay accepted for older callers.
type SupplierItemWrite = Partial<SupplierItem> & {
  priceSar?: number;
  supplierId?: string;
};

export function useCreateSupplierItem() {
  const qc = useQueryClient();
  return useMutation({
    // T13 §8 — name required; priceSar (riyals) OR priceHalalas (halalas) for price.
    mutationFn: async (body: SupplierItemWrite & { name: string }) => {
      const res = await api.post<SupplierItem>("/asab/supplier/items", body);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "items"] });
      toast.success("تم إضافة الصنف");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useUpdateSupplierItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...patch
    }: { id: string } & SupplierItemWrite) => {
      const res = await api.patch<SupplierItem>(
        `/asab/supplier/items/${id}`,
        patch,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "items"] });
      toast.success("تم تحديث الصنف");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useDeleteSupplierItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/asab/supplier/items/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "items"] });
      toast.success("تم حذف الصنف");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useToggleSupplierItemActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post<SupplierItem>(
        `/asab/supplier/items/${id}/toggle-active`,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "items"] });
      toast.success("تم تبديل حالة الصنف");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useExportSupplierItems() {
  return useMutation({
    mutationFn: async (format: "xlsx" | "csv" = "xlsx") => {
      await downloadBlob(
        "/asab/supplier/items/export",
        `supplier-items.${format}`,
        { format },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Download the supplier catalog template (empty, or the supplier's saved rows). */
export function useSupplierItemsTemplate() {
  return useMutation({
    mutationFn: async (format: "xlsx" | "csv" = "xlsx") => {
      await downloadBlob(
        "/asab/supplier/items/template",
        `supplier-items-template.${format}`,
        { format },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Bulk import the supplier catalog from Excel/CSV. Idempotent (code, else name). */
export function useImportSupplierItems() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post<{
        itemCount: number;
        errors?: Array<{ row: number; message: string }>;
      }>("/asab/supplier/items/import", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["platform", "supplier", "items"] });
      const n = data?.itemCount ?? 0;
      const failed = data?.errors?.length ?? 0;
      if (failed > 0) toast.warning(`تم استيراد ${n} صنف · ${failed} صف به خطأ`);
      else toast.success(`تم استيراد ${n} صنف`);
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useExportSupplierOrders() {
  return useMutation({
    mutationFn: async (
      filter: {
        status?: "pending" | "accepted" | "delivered" | "rejected";
        format?: "xlsx" | "csv";
      } = {},
    ) => {
      const fmt = filter.format ?? "xlsx";
      await downloadBlob(
        "/asab/supplier/orders/export",
        `supplier-orders-${filter.status ?? "all"}.${fmt}`,
        { ...filter, format: fmt },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
