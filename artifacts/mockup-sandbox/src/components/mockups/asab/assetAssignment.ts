// Pure decision logic for the fixed-assets → branch assignment flow.
// Extracted from AccCompanyAssets so it can be unit-tested without a DOM/network:
// brand-level uploaded assets arrive with branchId=null and must be assigned to
// a branch before they surface in branch screens (PATCH /company/me/assets/{id}).

/** True when an asset has no branch yet (null or empty) → needs assignment. */
export function isUnassignedAsset(a: { branchId: string | null }): boolean {
  return !a.branchId;
}

/**
 * Patch body for assigning an asset to a branch. Returns null when no branch is
 * chosen so the caller can no-op instead of sending an empty/invalid request.
 */
export function buildAssignPatch(
  branchId: string,
): { branchId: string } | null {
  return branchId ? { branchId } : null;
}

/**
 * Branch fragment for the edit-asset patch. Omitted entirely when empty so a
 * normal edit never clears an existing branch assignment by accident.
 */
export function branchPatchPart(
  branchId: string,
): { branchId: string } | Record<string, never> {
  return branchId ? { branchId } : {};
}
