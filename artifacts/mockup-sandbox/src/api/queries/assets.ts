import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { api, downloadBlob } from "../client";
import type {
  Asset,
  AssetCategoryLookup,
  AssetDraft,
  AssetEnumsCatalogue,
  AssetImportResult,
  AssetsRegisterResponse,
  ConfirmDraftResponse,
} from "../types/company";
import { getErrorMessage } from "../errors";
import { queryKeys, type AssetFilter } from "./keys";

// ─── Register list (T05 §9) — paginated envelope w/ meta.summary + meta.drafts ─
export function useAssets(filter: AssetFilter = {}) {
  const clean = Object.fromEntries(
    Object.entries(filter).filter(([, v]) => v !== undefined && v !== "" && v !== "all"),
  );
  return useQuery({
    queryKey: queryKeys.assets(filter),
    queryFn: async () => {
      const res = await api.get<AssetsRegisterResponse>("/company/me/assets", {
        params: clean,
      });
      return res.data;
    },
  });
}

// ─── Register create (T05 §10) ⚠️ idempotent ─────────────────────────────────
export function useCreateAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      category: string;
      branchId: string;
      cost?: number;
      priceHalalas?: number;
      usefulLifeMonths: number;
      invNum?: string;
      serial?: string;
      purchaseDate?: string;
      custodian?: string;
      notes?: string;
    }) => {
      const res = await api.post<Asset>("/company/me/assets", payload);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("تم إضافة الأصل");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Register edit (T05 §11) ⚠️ idempotent ───────────────────────────────────
export function usePatchAsset() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: {
        name?: string;
        category?: string;
        status?: string;
        bookValue?: number;
        bookValueHalalas?: number;
        custodian?: string | null;
        serial?: string | null;
        purchaseDate?: string | null;
        branchId?: string | null;
        note?: string | null;
      };
    }) => {
      const res = await api.patch<Asset>(`/company/me/assets/${id}`, patch);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("تم تحديث الأصل");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Register import (T05 §13) ───────────────────────────────────────────────
export function useImportAssets() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await api.post<AssetImportResult>(
        "/company/me/assets/import",
        form,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["assets"] });
      const failed = data.errors?.length ?? 0;
      if (failed > 0) {
        toast.warning(`تم استيراد ${data.createdRows} من ${data.parsedRows} — ${failed} صف مرفوض`);
      } else {
        toast.success(`تم استيراد ${data.createdRows} أصل من ${data.parsedRows}`);
      }
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Register export (T05 §12) ───────────────────────────────────────────────
export function useExportAssets() {
  return useMutation({
    mutationFn: async (
      filter: { format?: "xlsx" | "csv"; category?: string; branchId?: string } = {},
    ) => {
      const fmt = filter.format ?? "xlsx";
      await downloadBlob(
        "/company/me/assets/export",
        `assets.${fmt}`,
        { ...filter, format: fmt },
      );
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Asset drafts (T05 §7) ────────────────────────────────────────────────────
export function useAssetDrafts() {
  return useQuery({
    queryKey: queryKeys.assetDrafts,
    queryFn: async () => {
      const res = await api.get<{ data: AssetDraft[] } | AssetDraft[]>(
        "/company/me/asset-drafts",
      );
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
  });
}

// ─── Confirm / discard a draft (T05 §8) ⚠️ idempotent ────────────────────────
export function useConfirmAssetDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (draftId: string) => {
      const res = await api.post<ConfirmDraftResponse>(
        `/company/me/asset-drafts/${draftId}/confirm`,
      );
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.assetDrafts });
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success(`تم تأكيد المسودة — ${data.createdAssets?.length ?? 0} أصل`);
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

export function useDiscardAssetDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (draftId: string) => {
      await api.post(`/company/me/asset-drafts/${draftId}/discard`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.assetDrafts });
      qc.invalidateQueries({ queryKey: ["assets"] });
      toast.success("تم تجاهل المسودة");
    },
    onError: (e) => toast.error(getErrorMessage(e, "ar")),
  });
}

// ─── Lookups (T05 §14) ────────────────────────────────────────────────────────
export function useAssetCategories() {
  return useQuery({
    queryKey: queryKeys.assetCategories,
    queryFn: async () => {
      const res = await api.get<{ data: AssetCategoryLookup[] } | AssetCategoryLookup[]>(
        "/company/me/lookups/asset-categories",
      );
      const d = res.data;
      return Array.isArray(d) ? d : (d.data ?? []);
    },
    staleTime: 5 * 60_000,
  });
}

export function useAssetEnums() {
  return useQuery({
    queryKey: queryKeys.assetEnums,
    queryFn: async () => {
      const res = await api.get<AssetEnumsCatalogue>("/lookups/asset-enums");
      return res.data;
    },
    staleTime: 30 * 60_000,
  });
}
