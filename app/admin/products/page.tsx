'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import { supabase } from '../../../lib/supabase'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

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

export default function ProductsPage() {
  const router = useRouter()

  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    tag: '',
    status: 'Active',
    image: '',
  })

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

    fetchProducts()
  }

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    setProducts(data || [])
  }

  const openAdd = () => {
    setEditingProduct(null)
    setForm({
      name: '',
      price: '',
      stock: '',
      tag: '',
      status: 'Active',
      image: '',
    })
    setIsModalOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditingProduct(product)
    setForm({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      tag: product.tag || '',
      status: product.status || 'Active',
      image: product.image || '',
    })
    setIsModalOpen(true)
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      alert(error.message)
      return
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    setForm((prev) => ({
      ...prev,
      image: data.publicUrl,
    }))
  }

  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name: form.name,
      price: Number(form.price),
      stock: Number(form.stock),
      tag: form.tag,
      status: Number(form.stock) <= 0 ? 'Sold Out' : form.status,
      image: form.image || '/images/adidas.jpg',
    }

    let result

    if (editingProduct) {
      result = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProduct.id)
    } else {
      result = await supabase
        .from('products')
        .insert([{ ...payload, sold: 0 }])
    }

    if (result.error) {
      alert(result.error.message)
      console.log(result.error)
      return
    }

    setIsModalOpen(false)
    fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm('Yakin ingin menghapus produk ini?')
    if (!confirmDelete) return

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      alert(error.message)
      return
    }

    fetchProducts()
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
        <AdminHeader title="Products" />

        <div className="p-6 md:p-10">
          <section className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden">
            <div className="p-8 flex flex-col md:flex-row justify-between gap-5 md:items-center border-b border-black/5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                  Inventory
                </p>

                <h3 className="text-3xl font-light uppercase tracking-tighter">
                  Product Management
                </h3>
              </div>

              <button
                onClick={openAdd}
                className="bg-black text-white px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex gap-2 items-center justify-center hover:bg-[#7D8471] transition-all"
              >
                <Plus size={15} />
                Add Product
              </button>
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
                  {products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-8 py-16 text-center text-xs font-black uppercase tracking-widest text-gray-400"
                      >
                        Belum ada produk. Klik Add Product.
                      </td>
                    </tr>
                  ) : (
                    products.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-black/5 hover:bg-[#FAFAF8]"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-2xl object-cover bg-gray-100"
                            />

                            <div>
                              <p className="text-xs font-black uppercase">
                                {item.name}
                              </p>

                              <p className="text-[9px] text-[#7D8471] uppercase tracking-widest">
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
                          <span
                            className={`px-3 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                              item.status === 'Sold Out'
                                ? 'bg-red-50 text-red-500'
                                : 'bg-[#7D8471]/10 text-[#7D8471]'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-8 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEdit(item)}
                              className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#7D8471] hover:text-white transition-all"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              onClick={() => deleteProduct(item.id)}
                              className="w-9 h-9 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5">
          <form
            onSubmit={saveProduct}
            className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 shadow-2xl space-y-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
                  Product Form
                </p>

                <h3 className="text-3xl font-light uppercase tracking-tighter">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Product name"
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black placeholder:text-gray-400"
              required
            />

            <input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
              type="number"
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black placeholder:text-gray-400"
              required
            />

            <input
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              placeholder="Stock"
              type="number"
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black placeholder:text-gray-400"
              required
            />

            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              placeholder="Tag"
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black placeholder:text-gray-400"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black"
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Sold Out</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full bg-[#F7F7F2] rounded-2xl px-5 py-4 text-xs outline-none text-black"
            />

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-2xl bg-gray-100"
              />
            )}

            <button className="w-full bg-black text-white py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#7D8471] transition-all">
              Save Product
            </button>
          </form>
        </div>
      )}
    </main>
  )
}