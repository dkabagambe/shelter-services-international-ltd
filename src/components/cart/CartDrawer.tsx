import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";


export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalQty } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="size-5 text-[#1a6b3c]" />
            <span className="text-base font-bold text-gray-900">Your Cart</span>
            {items.length > 0 && (
              <span className="rounded-full bg-[#1a6b3c] px-2 py-0.5 text-xs font-bold text-white">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid size-8 place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <ShoppingCart className="size-12 text-gray-200" />
              <p className="text-sm font-semibold text-gray-500">Your cart is empty</p>
              <Button
                size="sm"
                onClick={closeCart}
                className="bg-[#1a6b3c] text-white hover:bg-[#145530]"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.tagline}</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1">
                        <button
                          onClick={() => updateQty(product.id, quantity - 1)}
                          className="text-gray-600 transition-colors hover:text-[#1a6b3c] disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-[36px] text-center text-sm font-semibold text-gray-900">
                          {quantity} kg
                        </span>
                        <button
                          onClick={() => updateQty(product.id, quantity + 1)}
                          className="text-gray-600 transition-colors hover:text-[#1a6b3c]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <p className="text-sm font-extrabold text-[#1a6b3c]">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total weight</span>
              <span className="font-semibold text-gray-900">{totalQty} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">Subtotal</span>
              <span className="text-xl font-extrabold text-[#1a6b3c]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <Link to="/checkout" onClick={closeCart} className="block">
              <Button className="w-full bg-[#1a6b3c] text-white hover:bg-[#145530] text-sm font-bold py-3">
                Proceed to Checkout
              </Button>
            </Link>
            <Link to="/shop" onClick={closeCart} className="block">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 text-sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
