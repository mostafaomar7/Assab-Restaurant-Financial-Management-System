import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api, type Page } from "../../client";
import { getErrorMessage } from "../../errors";
import type {
  PlatformProcurementItem,
  PlatformProcurementOrder,
  PlatformProcurementOverview,
  PlatformProcurementSupplier,
  PurchaseOrder,
  PurchaseOrderBulkApproveResult,
  PurchaseOrderDetail,
  PurchaseOrderGroupDetail,
  PurchaseOrderGroupedResponse,
  PurchaseOrderSendResult,
  PurchaseOrderSentGroup,
} from "../../types/platform";
import {
  queryKeys,
  type PlatformProcurementOrdersFilter,
  type PurchaseOrdersFilter,
} from "../keys";

// ─── Overview ───────────────────────────────────────────────────────────────
export function useProcurementOverviewPlatform() {
  return useQuery({
    queryKey: queryKeys.platformProcurementOverview,
    queryFn: async () => {
      const res = await api.get<PlatformProcurementOverview>(
        "/company/me/procurement/overview",
      );
      return res.data;
    },
    staleTime: 15_000,
  });
}

// ─── Orders ─────────────────────────────────────────────────────────────────
export function useProcurementOrdersPlatform(
  filter: PlatformProcurementOrdersFilter = {},
) {
  return useQuery({
    queryKey: queryKeys.platformProcurementOrders(filter),
    queryFn: async () => {
      const res = await api.get<
        Page<PlatformProcurementOrder> | PlatformProcurementOrder[]
      >("/company/me/procurement/orders", { params: filter });
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

export function useProcurementOrderPlatform(id?: string) {
  return useQuery({
    queryKey: queryKeys.platformProcurementOrder(id ?? ""),
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await api.get<PlatformProcurementOrder>(
        `/company/me/procurement/orders/${id}`,
      );
      return res.data;
    },
  });
}

export function useApproveProcurementOrderPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...body
    }: { id: string } & Record<string, unknown>) => {
      const res = await api.post<PlatformProcurementOrder>(
        `/company/me/procurement/orders/${id}/approve`,
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      qc.invalidateQueries({
        queryKey: ["platform", "procurement", "overview"],
      });
      toast.success("تم اعتماد الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useBulkApproveProcurementOrdersPlatform() {
  const qc = useQueryClient();
  return useMutation({
    // Contract 5.3 bulk: POST /company/me/procurement/orders/approve { orderIds?, branch?, supplier? }
    mutationFn: async (body: { orderIds?: string[]; branch?: string; supplier?: string }) => {
      const res = await api.post<{ approved: string[]; count: number }>(
        "/company/me/procurement/orders/approve",
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "overview"] });
      toast.success("تم اعتماد الطلبات");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useRejectProcurementOrderPlatform() {
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
      const res = await api.post<PlatformProcurementOrder>(
        `/company/me/procurement/orders/${id}/reject`,
        { reason, notes },
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      qc.invalidateQueries({
        queryKey: ["platform", "procurement", "overview"],
      });
      toast.success("تم رفض الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function usePartialRejectProcurementOrderPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...body
    }: { id: string } & Record<string, unknown>) => {
      const res = await api.post<PlatformProcurementOrder>(
        `/company/me/procurement/orders/${id}/partial-reject`,
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      toast.success("تم الرفض الجزئي");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useConsolidateProcurementOrdersPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Record<string, unknown>) => {
      const res = await api.post<unknown>(
        "/company/me/procurement/orders/consolidate",
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      qc.invalidateQueries({
        queryKey: ["platform", "procurement", "overview"],
      });
      toast.success("تم تجميع الطلبات");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useSendProcurementOrderPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      groupId,
      ...body
    }: { groupId: string } & Record<string, unknown>) => {
      const res = await api.post<unknown>(
        `/company/me/procurement/orders/grouped/${groupId}/send`,
        body,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["platform", "procurement", "orders"] });
      qc.invalidateQueries({
        queryKey: ["platform", "procurement", "overview"],
      });
      toast.success("تم إرسال الطلب للمورد");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Suppliers & items ──────────────────────────────────────────────────────
export function useProcurementSuppliersPlatform() {
  return useQuery({
    queryKey: queryKeys.platformProcurementSuppliers,
    queryFn: async () => {
      const res = await api.get<
        Page<PlatformProcurementSupplier> | PlatformProcurementSupplier[]
      >("/company/me/procurement/suppliers");
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

export function useProcurementItemsPlatform() {
  return useQuery({
    queryKey: queryKeys.platformProcurementItems,
    queryFn: async () => {
      const res = await api.get<
        Page<PlatformProcurementItem> | PlatformProcurementItem[]
      >("/company/me/procurement/items");
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

// ════════════════════════════════════════════════════════════════════════════
// Purchase-orders BRIDGE (real branch/mobile-app orders). Amounts = SAR floats.
// Base: /company/me/procurement/purchase-orders
// NOTE: routes are not on the live server yet (return 404 until backend deploys
// branch `asab-admin-backend`). Screens render safe empty states until then.
// ════════════════════════════════════════════════════════════════════════════

const PO_BASE = "/company/me/procurement/purchase-orders";
const invalidatePO = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ["platform", "procurement", "purchase-orders"] });
  qc.invalidateQueries({ queryKey: ["platform", "procurement", "overview"] });
};

/** List branch orders. Returns the FULL page so callers can read `meta.total`. */
export function usePurchaseOrders(
  filter: PurchaseOrdersFilter = {},
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrders(filter),
    enabled: options.enabled ?? true,
    queryFn: async () => {
      const res = await api.get<Page<PurchaseOrder>>(PO_BASE, { params: filter });
      const d = res.data as Page<PurchaseOrder> | PurchaseOrder[];
      // Normalise to a page shape even if the backend returns a bare array.
      if (Array.isArray(d)) {
        return { data: d, meta: { page: 1, pageSize: d.length, total: d.length, totalPages: 1 } };
      }
      return d;
    },
  });
}

/** Single order detail (accepts uuid OR orderNumber). */
export function usePurchaseOrder(
  id?: string,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrder(id ?? ""),
    enabled: Boolean(id) && (options.enabled ?? true),
    queryFn: async () => {
      const res = await api.get<PurchaseOrderDetail>(`${PO_BASE}/${id}`);
      return res.data;
    },
  });
}

/** Orders decided by the current manager (decided_at DESC). Full page. */
export function usePurchaseOrdersApprovedByMe(
  filter: PurchaseOrdersFilter = {},
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrdersApprovedByMe(filter),
    enabled: options.enabled ?? true,
    queryFn: async () => {
      const res = await api.get<Page<PurchaseOrder>>(`${PO_BASE}/approved-by-me`, {
        params: filter,
      });
      const d = res.data as Page<PurchaseOrder> | PurchaseOrder[];
      if (Array.isArray(d)) {
        return { data: d, meta: { page: 1, pageSize: d.length, total: d.length, totalPages: 1 } };
      }
      return d;
    },
  });
}

export function useApprovePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.post<PurchaseOrder>(`${PO_BASE}/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      invalidatePO(qc);
      toast.success("تم اعتماد الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Partial approve — quantity 0 rejects that line; all zeros = full rejection. */
export function usePartialApprovePurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      items,
      note,
    }: {
      id: string;
      items: Array<{ orderItemId: string; quantity: number }>;
      note?: string;
    }) => {
      const res = await api.post<PurchaseOrder>(`${PO_BASE}/${id}/partial-approve`, {
        items,
        note,
      });
      return res.data;
    },
    onSuccess: () => {
      invalidatePO(qc);
      toast.success("تم الاعتماد الجزئي");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useRejectPurchaseOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const res = await api.post<PurchaseOrder>(`${PO_BASE}/${id}/reject`, { reason });
      return res.data;
    },
    onSuccess: () => {
      invalidatePO(qc);
      toast.success("تم رفض الطلب");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Bulk approve — per-order failures are collected in the result, never thrown. */
export function useBulkApprovePurchaseOrders() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (orderIds: string[]) => {
      const res = await api.post<PurchaseOrderBulkApproveResult>(
        `${PO_BASE}/bulk-approve`,
        { orderIds },
      );
      return res.data;
    },
    onSuccess: (data) => {
      invalidatePO(qc);
      const ok = data?.count ?? data?.approved?.length ?? 0;
      const failed = data?.failed?.length ?? 0;
      if (failed > 0) {
        toast.warning(`تم اعتماد ${ok} وتعذّر ${failed}`);
      } else {
        toast.success(`تم اعتماد ${ok} طلب`);
      }
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Live preview grouped by supplier (default) or city. Nothing persisted here. */
export function useGroupedPurchaseOrders(
  by: "supplier" | "city" = "supplier",
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrdersGrouped(by),
    enabled: options.enabled ?? true,
    queryFn: async () => {
      const res = await api.get<PurchaseOrderGroupedResponse>(`${PO_BASE}/grouped`, {
        params: { by },
      });
      return res.data;
    },
  });
}

/** Send a supplier's consolidatable orders. Omit orderIds = send ALL of them. */
export function useSendGroupedPurchaseOrders() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      supplierId,
      orderIds,
    }: {
      supplierId: string;
      orderIds?: string[];
    }) => {
      const res = await api.post<PurchaseOrderSendResult>(`${PO_BASE}/grouped/send`, {
        supplierId,
        orderIds,
      });
      return res.data;
    },
    onSuccess: () => {
      invalidatePO(qc);
      qc.invalidateQueries({
        queryKey: queryKeys.platformPurchaseOrdersSent,
      });
      toast.success("تم الإرسال للمورد");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

/** Groups already sent to suppliers (status derived live from member orders). */
export function useSentPurchaseOrders(options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrdersSent,
    enabled: options.enabled ?? true,
    queryFn: async () => {
      const res = await api.get<
        Page<PurchaseOrderSentGroup> | PurchaseOrderSentGroup[]
      >(`${PO_BASE}/sent`);
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

/** One sent group: header + aggregated items + member orders (for tracking). */
export function usePurchaseOrderGroup(
  groupId?: string,
  options: { enabled?: boolean } = {},
) {
  return useQuery({
    queryKey: queryKeys.platformPurchaseOrderGroup(groupId ?? ""),
    enabled: Boolean(groupId) && (options.enabled ?? true),
    queryFn: async () => {
      const res = await api.get<PurchaseOrderGroupDetail>(`${PO_BASE}/groups/${groupId}`);
      return res.data;
    },
  });
}
