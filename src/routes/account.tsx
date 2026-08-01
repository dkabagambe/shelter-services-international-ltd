import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Package, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account | Shelter Services International" }] }),
  component: AccountPage,
});

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

function AccountPage() {
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const { myOrders, fetchMyOrders, loading } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/login" });
  }, [user, authLoading]);

  useEffect(() => {
    if (user) fetchMyOrders(user.id);
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-[#1a6b3c] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main className="shell py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
              <User className="size-7" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                {profile?.full_name ?? user?.email}
              </h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-2 text-gray-600"
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
          >
            <LogOut className="size-4" /> Sign Out
          </Button>
        </div>

        {/* Orders */}
        <h2 className="mb-5 text-xl font-bold text-gray-900">My Orders</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading orders…</p>
        ) : myOrders.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 py-16 text-center">
            <Package className="size-12 text-gray-300" />
            <p className="text-sm font-semibold text-gray-500">No orders yet.</p>
            <Link to="/shop">
              <Button className="bg-[#1a6b3c] text-white hover:bg-[#145530]">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="flex-1 text-sm">
                        <span className="font-semibold text-gray-800">{item.product.name}</span>
                        <span className="ml-2 text-gray-400">× {item.quantity} kg</span>
                      </div>
                      <span className="text-sm font-bold text-[#1a6b3c]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-base font-extrabold text-[#1a6b3c]">
                    ${order.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
