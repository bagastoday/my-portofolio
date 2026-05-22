'use client'

import { Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
  stock: number
  sold: number
  tag: string
  status: string
  image: string
}

type ProductTableProps = {
  products: Product[]
  onAdd: () => void
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductTable({
  products,
  onAdd,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <section className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-black/5 flex flex-col md:flex-row justify-between gap-5 md:items-center">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
            Inventory Manager
          </p>
          <h3 className="text-3xl font-light uppercase tracking-tighter">
            Product Management
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search product..."
              className="w-full md:w-64 bg-[#F7F7F2] rounded-full pl-11 pr-5 py-4 text-xs outline-none border border-black/5"
            />
          </div>

          <button
            onClick={onAdd}
            className="bg-black text-white px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-[#F7F7F2] text-[9px] uppercase tracking-[0.35em] text-gray-400 font-black">
            <tr>
              <th className="px-8 py-5">Product</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5">Stock</th>
              <th className="px-8 py-5">Sold</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id} className="border-t border-black/5">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider">
                        {item.name}
                      </p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[#7D8471]">
                        {item.tag}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-5 text-xs font-bold">
                  {formatRupiah(item.price)}
                </td>

                <td className="px-8 py-5 text-xs font-bold">
                  {item.stock}
                </td>

                <td className="px-8 py-5 text-xs font-bold">
                  {item.sold}
                </td>

                <td className="px-8 py-5">
                  <span className="px-3 py-2 rounded-full text-[8px] font-black uppercase tracking-widest bg-[#7D8471]/10 text-[#7D8471]">
                    {item.status}
                  </span>
                </td>

                <td className="px-8 py-5">
                  <div className="flex justify-end gap-2">
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                      <Eye size={14} />
                    </button>

                    <button
                      onClick={() => onEdit(item)}
                      className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}