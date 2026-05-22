export default function OrderList({ orders, formatRupiah }: any) {
  return (
    <section className="bg-white rounded-[2.5rem] border border-black/5 p-8">
      <div className="mb-8">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8471]">
          Latest Order
        </p>

        <h3 className="text-3xl font-light uppercase tracking-tighter">
          Orders
        </h3>
      </div>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#F7F7F2]"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-wider">
                {order.id}
              </p>

              <p className="text-[10px] font-sans text-gray-500">
                {order.customer} • {order.product}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-black font-sans">
                {formatRupiah(order.total)}
              </p>

              <p className="text-[9px] font-black uppercase tracking-widest text-[#7D8471]">
                {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}