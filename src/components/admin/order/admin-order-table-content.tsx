"use client";

import { trpc } from "@/app/_trpc/client";
import { TableBody } from "@/components/ui/table";
import React from "react";
import AdminOrderTableContentCard from "./admin-order-table-content-card";

const AdminOrderTableContent = () => {
  const { data, isLoading, refetch } = trpc.admin.getAllOrders.useQuery();

  if (isLoading) return null;

  return (
    <TableBody>
      {data?.map((orders) => (
        <AdminOrderTableContentCard key={orders.id} data={orders} />
      ))}
    </TableBody>
  );
};

export default AdminOrderTableContent;
