// ─── Roles ───────────────────────────────────────────────────────────────────
export type RoleKey =
  | "admin"
  | "company-admin"
  | "head"
  | "accountant"
  | "branch"
  | "procurement"
  | "supplier";

// ─── Authentication ──────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: RoleKey;
  /** Null only for platform `admin`. */
  companyId: string | null;
  brandIds?: string[];
  restaurantIds?: string[];
  branchIds?: string[];
  avatar?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  companyId: string | null;
  /** Backend tells us where to land the user after login. */
  defaultPage: string;
}

export interface MeResponse extends User {
  /** Permission map (key → boolean) for UI gating. */
  permissions: Record<string, boolean>;
}

// ─── Operations (the 6-stage approval pipeline core) ─────────────────────────
export type ModuleKey =
  | "sales"
  | "expenses"
  | "purchases"
  | "inventory"
  | "shifts"
  | "employees"
  | "cash"
  | "waste";

export type OperationStatus =
  | "pending"
  | "approved"
  | "final-approved"
  | "rejected";

export type MatchStatus = "exact" | "review" | "diff";

export type OperationOrigin = "mobile" | "procurement" | "system";

export interface OperationActor {
  id: string;
  name: string;
}

/** `GET /operations` row's ready-made lifecycle badge (T03 §1 notes). */
export interface OperationStage {
  key: "submit" | "review" | "approved" | "final" | "erp" | "reports" | "rejected";
  step: number;
  icon: string;
  labelAr: string;
  labelShortAr: string;
}

/** Sales-module rows only (T04 §8); `null` until the operation is reconciled. */
export interface SalesBreakdown {
  cashHalalas: number;
  cardHalalas: number;
  appsHalalas: number;
  totalSalesHalalas: number;
  collectedHalalas: number;
  varianceHalalas: number;
}

export interface Operation {
  id: string;
  /** Human ID, e.g. "OPS-2401". */
  publicId: string;
  moduleKey: ModuleKey;
  sourceModule?: string | null;
  sourceId?: string | null;
  status: OperationStatus;
  statusLabelAr?: string;
  statusLabelShortAr?: string;
  match?: MatchStatus;
  matchLabelAr?: string;
  diffNote?: string | null;
  origin?: OperationOrigin;
  originLabelAr?: string;
  originIcon?: string;
  attachmentCount?: number;
  stage?: OperationStage;
  /** Sales rows only; `null` until reconciled, absent on other modules. */
  salesBreakdown?: SalesBreakdown | null;
  /** Purchases list rows only (T06 §1); absent on other modules. */
  purchaseRow?: import("./company").PurchaseRow | null;
  branchId: string;
  branchName: string;
  brandId?: string;
  brandName?: string;
  restaurantId?: string;
  restaurantName?: string;
  /** Integer halalas. */
  amountHalalas: number;
  operationDate: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
  submittedBy?: OperationActor;
  approvedBy?: OperationActor | null;
  approvedAt?: string | null;
  finalApprovedBy?: OperationActor | null;
  finalApprovedAt?: string | null;
  rejectedBy?: OperationActor | null;
  rejectedAt?: string | null;
  rejectReason?: string | null;
  rejectReasonKey?: string | null;
  rejectNotes?: string | null;
  isConditional?: boolean;
  conditionalNote?: string | null;
  isCorrection?: boolean;
  correctiveRefId?: string | null;
  erpPosted?: boolean;
  erpBatchId?: string | null;
  // ── Present only on GET /operations/{id} (single-detail response) ──────────
  payload?: { channels?: unknown[] };
  auditTrail?: AuditEvent[];
  /** Sales-module single-op detail only (T04 §4); `null` until reconciled. */
  reconciliation?: import("./company").SalesReconciliation | null;
  /** Expenses-module single-op detail only (T05 §1). */
  expenses?: import("./company").ExpensesBlock | null;
  /** Purchases-module single-op detail only (T06 §2). */
  purchases?: import("./company").PurchasesBlock | null;
}

export interface AuditEvent {
  icon: string;
  action: string;
  by: string;
  time: string;
  isTerminal?: boolean;
  meta?: Record<string, unknown>;
}

// ─── Notifications ───────────────────────────────────────────────────────────
export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  link?: string | null;
  refType?: string | null;
  refId?: string | null;
  readAt?: string | null;
  createdAt: string;
}

// ─── Common Lookup row ───────────────────────────────────────────────────────
export interface LookupRow {
  id: string;
  name: string;
  nameAr?: string;
  parentId?: string | null;
  extra?: Record<string, unknown>;
}

// Re-export error & page types for convenience.
export type { Page } from "../client";
export { ApiError, isApiError, getErrorMessage } from "../errors";
