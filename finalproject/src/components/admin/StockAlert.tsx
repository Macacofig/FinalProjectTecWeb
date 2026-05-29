"use client";

import { useState } from "react";
import type { Product } from "@/models/product.model";
import Table from "@/components/ui/Table";

interface StockAlertProps {
  products: Product[];
}

export default function StockAlert({ products }: StockAlertProps) {
  const [isOpen, setIsOpen] = useState(false);

  const outOfStock = products.filter((p) => !p.quantity || p.quantity === 0);

  if (outOfStock.length === 0) return null;

  const columns = [
    { header: "ID", accessor: "id" as keyof Product },
    { header: "Nombre", accessor: "title" as keyof Product },
    { header: "Stock", accessor: "quantity" as keyof Product },
    {
      header: "Precio",
      accessor: (p: Product) => `$${Number(p.price).toFixed(2)}`,
    },
  ];

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 px-6 py-4 text-left text-red-400 hover:bg-red-500/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <span className="text-lg font-semibold text-red-300 md:text-xl">
            Alerta de stock agotado
          </span>
          <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-sm font-medium text-red-300">
            {outOfStock.length} producto(s)
          </span>
        </div>
        <span className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-slate-900 p-4">
          <h3 className="mb-3 text-sm font-medium text-red-300">
            Productos sin stock disponible
          </h3>
          <Table
            columns={columns}
            data={outOfStock}
            keyExtractor={(p) => String(p.id ?? Math.random())}
          />
        </div>
      )}
    </div>
  );
}