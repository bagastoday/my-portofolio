'use client'

import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart,
  LogOut,
} from 'lucide-react'

export default function AdminSidebar() {
  const router = useRouter()

  const menus = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-black/5 p-8 flex-col justify-between z-50">
      <div>
        <h1 className="text-2xl font-light uppercase italic mb-10">
          BGM<span className="text-[#7D8471]">.</span>
        </h1>

        <div className="space-y-3">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              <menu.icon size={16} />
              {menu.label}
            </Link>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-500 hover:text-white transition-all"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  )
}