'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminHeader from '../components/admin/AdminHeader'
import StatCard from '../components/admin/StatCard'
import { supabase } from '../../lib/supabase'
import { Package, Wallet, BarChart, ShoppingBag } from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  stock: number
  sold: number
  tag: string
  status: string
  image: string
}

type Order = {
  id: string
  customer: string
  product: string
  total: number
  status: string
}

export default function AdminPage() {
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }

  const fetchData = async () => {
    const { data: productsData } = await supabase.from('products').select('*')
    const { data: ordersData } = await supabase.from('orders').select('*')

    setProducts(productsData || [])
    setOrders(ordersData || [])
  }

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const totalRevenue = useMemo(
    () => products.reduce((total, item) => total + item.price * item.sold, 0),
    [products]
  )

  const totalStock = useMemo(
    () => products.reduce((total, item) => total + item.stock, 0),
    [products]
  )

  const totalSold = useMemo(
    () => products.reduce((total, item) => total + item.sold, 0),
    [products]
  )

  return (
    <main className="min-h-screen bg-[#F7F7F2] text-[#1A1A1A]">
      <AdminSidebar />

      <section className="lg:pl-[260px] min-h-screen">
        <AdminHeader title="Dashboard" />

        <div className="p-6 md:p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="Revenue"
              value={formatRupiah(totalRevenue)}
              note="+18.4% this month"
              icon={Wallet}
            />

            <StatCard
              title="Products"
              value={products.length}
              note="Active catalog"
              icon={Package}
            />

            <StatCard
              title="Total Stock"
              value={totalStock}
              note="Ready to sell"
              icon={ShoppingBag}
            />

            <StatCard
              title="Items Sold"
              value={totalSold}
              note="All time sales"
              icon={BarChart}
            />
          </div>

          <section className="bg-[#1A1A1A] text-white rounded-[2.5rem] p-8 md:p-10">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#AEB89D]">
              Brand Performance
            </p>

            <h2 className="mt-4 text-4xl md:text-6xl font-light uppercase tracking-tighter">
              Admin control center for BGM Atelier.
            </h2>

            <p className="mt-5 text-sm text-white/50 max-w-xl">
              Data produk dan order sudah tersambung ke Supabase.
            </p>

            <div className="mt-8">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span>Sales Target</span>
                <span>78%</span>
              </div>

              <div className="mt-3 h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-[#AEB89D] rounded-full" />
              </div>
            </div>
          </section>

          <div className="grid xl:grid-cols-2 gap-6">
            <section className="bg-white rounded-[2.5rem] border border-black/5 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                Latest Orders
              </p>

              <h3 className="text-3xl font-light uppercase tracking-tighter mb-6">
                Orders
              </h3>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between p-4 rounded-2xl bg-[#F7F7F2]"
                  >
                    <div>
                      <p className="text-xs font-black uppercase">
                        {order.customer}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        {order.product}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black">
                        {formatRupiah(order.total)}
                      </p>

                      <p className="text-[9px] font-black text-[#7D8471] uppercase">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] border border-black/5 p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                Low Stock Alert
              </p>

              <h3 className="text-3xl font-light uppercase tracking-tighter mb-6">
                Restock List
              </h3>

              <div className="space-y-4">
                {products
                  .filter((item) => item.stock <= 10)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-4 rounded-2xl bg-[#F7F7F2]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />

                        <div>
                          <p className="text-xs font-black uppercase">
                            {item.name}
                          </p>

                          <p className="text-[9px] text-gray-400 uppercase">
                            {item.tag}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-black text-red-500">
                        {item.stock} left
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}