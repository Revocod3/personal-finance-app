import {
  IconDeviceDesktopAnalytics,
  IconReceipt,
  IconBusinessplan,
  IconCash,
} from "@tabler/icons-react";

export const dashboardLinks = [
  { icon: IconReceipt, label: "Gastos", path: "/dashboard/expenses" },
  { icon: IconCash, label: "Ingresos", path: "/dashboard/income" },
  {
    icon: IconBusinessplan,
    label: "Ahorros",
    path: "/dashboard/savings",
  },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Reportes",
    path: "/dashboard/reports",
  },
];
