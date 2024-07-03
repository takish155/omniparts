import { Table, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import AdminOrderTableHeader from "./admin-order-table-header";
import dynamic from "next/dynamic";

const AdminOrderTableContent = dynamic(
  () => import("./admin-order-table-content"),
  {
    ssr: false,
  }
);

const AdminOrderTable = () => {
  return (
    <Table>
      <AdminOrderTableHeader />
      <AdminOrderTableContent />
    </Table>
  );
};

export default AdminOrderTable;
