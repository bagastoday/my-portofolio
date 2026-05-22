'use client'

import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { supabase } from '../../../lib/supabase'

type Order = {
  id: string
  customer: string
  product: string
  total: number
  status: string
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    setOrders(data || [])
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    fetchOrders()
  }

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#1A1A1A]">
      <AdminSidebar />

      <section className="lg:pl-[260px] min-h-screen">
        <AdminHeader title="Orders" />

        <div className="p-6 md:p-10">
          <section className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden">
            <div className="p-8 border-b border-black/5">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                Order Management
              </p>

              <h3 className="text-3xl font-light uppercase tracking-tighter">
                Customer Orders
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#F7F7F2] text-[9px] uppercase tracking-[0.35em] text-gray-400 font-black">
                  <tr>
                    <th className="px-8 py-5">Customer</th>
                    <th className="px-8 py-5">Product</th>
                    <th className="px-8 py-5">Total</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Update</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-black/5">
                      <td className="px-8 py-5 text-xs font-black uppercase">{order.customer}</td>
                      <td className="px-8 py-5 text-xs">{order.product}</td>
                      <td className="px-8 py-5 text-xs font-bold">{formatRupiah(order.total)}</td>
                      <td className="px-8 py-5 text-xs font-black text-[#7D8471] uppercase">{order.status}</td>
                      <td className="px-8 py-5">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="bg-[#F7F7F2] rounded-xl px-4 py-3 text-xs outline-none"
                        >
                          <option>Paid</option>
                          <option>Packing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}