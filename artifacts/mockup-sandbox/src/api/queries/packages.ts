import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../client";
import { getErrorMessage } from "../errors";
import { queryKeys } from "./keys";

// ─── Packages (admin) — batch: subscription packages CRUD ────────────────────
// Replaces the hardcoded silver/gold/platinum plan enum. The AddBrand plan
// dropdown fills from GET /admin/packages (show isActive:true only); the value
// posted in `POST /admin/brands` stays in the `plan` field (accepts the new
// codes + the legacy silver/gold/platinum + Arabic names).

/** Prices are integers in the current money unit (halalas), same as before. */
export interface AdminPackage {
  id: string;
  code: string;
  name: string;
  nameEn?: string | null;
  price: number;
  isActive: boolean;
}

export interface CreatePackageBody {
  code: string;
  name: string;
  nameEn?: string;
  price: number;
  isActive?: boolean;
}

/** asab v1 responses are enveloped as { success, data }; tolerate raw too. */
function unwrap<T>(body: unknown): T {
  if (body && typeof body === "object" && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export function useAdminPackages() {
  return useQuery({
    queryKey: queryKeys.platformAdminPackages,
    queryFn: async () => {
      const res = await api.get<{ data: AdminPackage[] } | AdminPackage[]>(
        "/admin/packages",
      );
      const d = res.data as { data?: AdminPackage[] } | AdminPackage[];
      return Array.isArray(d) ? d : (d.data ?? []);
    },
    staleTime: 5 * 60_000,
  });
}

export function useCreateAdminPackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreatePackageBody) => {
      const res = await api.post("/admin/packages", body);
      return unwrap<AdminPackage>(res.data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.platformAdminPackages });
      toast.success("تم إنشاء الباقة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useUpdateAdminPackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...patch
    }: { id: string } & Partial<CreatePackageBody>) => {
      const res = await api.patch(`/admin/packages/${id}`, patch);
      return unwrap<AdminPackage>(res.data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.platformAdminPackages });
      toast.success("تم تحديث الباقة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useDeleteAdminPackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/packages/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.platformAdminPackages });
      toast.success("تم حذف الباقة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}
