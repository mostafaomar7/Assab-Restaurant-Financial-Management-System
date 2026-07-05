interface OperationRowProps {
  id: string;
  branch: string;
  type: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "final-approved";
  submittedBy?: string;
  reviewedBy?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
}

const statusMap = {
  pending: { label: "في الانتظار", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  approved: { label: "معتمد (مرحلة 1)", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  rejected: { label: "مرفوض", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
  "final-approved": { label: "معتمد نهائياً", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
};

export function OperationRow({
  id, branch, type, amount, date, status, submittedBy, reviewedBy, onApprove, onReject, onView
}: OperationRowProps) {
  const s = statusMap[status];
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-500 font-mono">{id}</td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-gray-800">{branch}</div>
        {submittedBy && <div className="text-xs text-gray-400">{submittedBy}</div>}
      </td>
      <td className="px-4 py-3">
        <span className="text-sm bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md font-medium">{type}</span>
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-800 text-left" dir="ltr">{amount}</td>
      <td className="px-4 py-3 text-xs text-gray-500">{date}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
          {s.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={onView}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
          >
            عرض
          </button>
          {status === "pending" && (
            <>
              <button
                onClick={onApprove}
                className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors font-medium"
              >
                ✓ موافقة
              </button>
              <button
                onClick={onReject}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
              >
                ✕ رفض
              </button>
            </>
          )}
          {status === "approved" && (
            <>
              <button
                onClick={onApprove}
                className="text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors font-medium"
              >
                ✓ اعتماد نهائي
              </button>
              <button
                onClick={onReject}
                className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
              >
                ✕ رفض
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
