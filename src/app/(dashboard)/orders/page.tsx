"use client";

import { useEffect } from "react";
import { GetAllOrders } from "src/api/orders";
import { columns } from "src/components/orders/columns";
import { DataTable } from "src/components/orders/data-table";


export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};


export default function OrdersPage() {


  useEffect(() => {
    const fetchData = async () => {
        const response = await GetAllOrders();
        // console.log("Fetched data:", response);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
