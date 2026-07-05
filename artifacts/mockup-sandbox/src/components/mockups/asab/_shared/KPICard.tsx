import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  iconBg: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  status?: "success" | "warning" | "danger" | "info";
  onClick?: () => void;
}

export function KPICard({
  title, value, subtitle, icon, iconBg, trend, trendValue, status, onClick
}: KPICardProps) {
  const statusBorder: Record<string, string> = {
    success: "border-l-4 border-l-emerald-500",
    warning: "border-l-4 border-l-amber-500",
    danger: "border-l-4 border-l-red-500",
    info: "border-l-4 border-l-blue-500",
  };
  return (
    <div
      className={`bg-white rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${status ? statusBorder[status] : "border border-gray-100"}`}
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs font-medium mb-1">{title}</p>
        <p className="text-gray-900 font-bold text-2xl leading-tight">{value}</p>
        {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
      </div>
      {trend && trendValue && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          trend === "up" ? "bg-emerald-50 text-emerald-600" :
          trend === "down" ? "bg-red-50 text-red-600" :
          "bg-gray-50 text-gray-500"
        }`}>
          {trend === "up" ? <TrendingUp size={12} /> : trend === "down" ? <TrendingDown size={12} /> : <Minus size={12} />}
          {trendValue}
        </div>
      )}
    </div>
  );
}
