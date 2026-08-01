import { useState } from "react";
import { Search, User, ShoppingCart, Menu, ChevronDown, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { Link } from "@tanstack/react-router";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

const nav: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "#about" },
  { label: "Our Farms", href: "#farms" },
  { label: "Quality & Certifications", href: "#certifications", hasDropdown: true },
  { label: "Exports", href: "#exports", hasDropdown: true },
  { label: "Contact Us", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { totalItems, totalPrice, openCart } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      {/* Top row: Logo | Search | Account + Cart */}
      <div className="shell flex items-center gap-4 py-3 lg:gap-6">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3 group">
          {/* House + leaf icon */}
          <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-[#1a6b3c] bg-white shadow-sm">
            <svg viewBox="0 0 48 48" className="size-9" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* House shape */}
              <path d="M8 22L24 8L40 22V40H30V30H18V40H8V22Z" fill="#1a6b3c" fillOpacity="0.15" stroke="#1a6b3c" strokeWidth="2.5" strokeLinejoin="round"/>
              {/* Leaf inside */}
              <path d="M24 36C24 28 30 24 36 24C36 32 30 36 24 36Z" fill="#1a6b3c"/>
              <path d="M24 36C24 28 18 24 12 24C12 32 18 36 24 36Z" fill="#1a6b3c" fillOpacity="0.5"/>
            </svg>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-base font-extrabold tracking-tight text-[#1a6b3c] sm:text-lg">
              SHELTER SERVICES
            </span>
            <span className="block text-[10px] font-bold tracking-[0.12em] text-[#1a6b3c] uppercase">
              INTERNATIONAL LIMITED
            </span>
            <span className="block text-[9px] font-medium tracking-wider text-gray-400 uppercase">
              FRESH PRODUCE. GLOBAL TRUST.
            </span>
          </span>
        </Link>

        {/* Search bar — grows to fill space */}
        <div className="hidden flex-1 lg:flex">
          <div className="flex h-11 w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[#1a6b3c] focus-within:ring-1 focus-within:ring-[#1a6b3c]">
            <input
              type="text"
              placeholder="Search for fresh vegetables..."
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <div className="flex h-full items-center border-l border-gray-300 px-3 text-xs text-gray-500 hover:bg-gray-50 cursor-pointer gap-1">
              All Categories <ChevronDown className="size-3.5" />
            </div>
            <button
              aria-label="Search"
              className="flex h-full items-center gap-1.5 bg-[#1a6b3c] px-4 text-white transition-colors hover:bg-[#145530]"
            >
              <Search className="size-4" />
            </button>
          </div>
        </div>

        {/* Account + Cart */}
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          {/* Account dropdown */}
          <div className="relative hidden lg:block">
            {user ? (
              <>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2.5"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-[#1a6b3c] text-xs font-bold text-white">
                    {(profile?.full_name ?? user.email ?? "U")[0].toUpperCase()}
                  </span>
                  <span className="leading-tight text-left">
                    <span className="block text-xs text-gray-500">
                      {isAdmin ? "Admin" : "My Account"}
                    </span>
                    <span className="block text-sm font-semibold text-gray-800">
                      {profile?.full_name ?? user.email} <ChevronDown className="inline size-3.5" />
                    </span>
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-50">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1a6b3c]"
                      >
                        <LayoutDashboard className="size-4" /> Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1a6b3c]"
                    >
                      <User className="size-4" /> My Account
                    </Link>
                    <button
                      onClick={async () => { setUserMenuOpen(false); await signOut(); }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                      <LogOut className="size-4" /> Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2.5">
                <User className="size-5 text-gray-600" />
                <span className="leading-tight text-left">
                  <span className="block text-xs text-gray-500">Login / Register</span>
                  <span className="block text-sm font-semibold text-gray-800">
                    My Account <ChevronDown className="inline size-3.5" />
                  </span>
                </span>
              </Link>
            )}
          </div>

          <button className="relative flex items-center gap-2.5" onClick={openCart} aria-label="Open cart">
            <span className="relative">
              <ShoppingCart className="size-6 text-gray-700" />
              <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#1a6b3c] text-[9px] font-bold text-white">
                {totalItems}
              </span>
            </span>
            <span className="hidden leading-tight text-left lg:block">
              <span className="block text-xs text-gray-500">Cart</span>
              <span className="block text-sm font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-gray-200 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Desktop nav bar */}
      <div className="hidden border-t border-gray-200 bg-white lg:block">
        <div className="shell flex items-center justify-between gap-2 py-0">
          {/* All Categories */}
          <button className="flex shrink-0 items-center gap-2 bg-[#1a6b3c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#145530]">
            <Menu className="size-4" />
            ALL CATEGORIES
          </button>

          {/* Nav links */}
          <nav className="flex items-center">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.href.startsWith("/") ? (item.href as "/") : "/"}
                className={`flex items-center gap-0.5 px-3 py-3 text-sm font-medium transition-colors hover:text-[#1a6b3c] ${
                  item.active
                    ? "text-[#1a6b3c] font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="ml-0.5 size-3.5" />}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/checkout">
              <Button
                variant="outline"
                size="sm"
                className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white"
              >
                Request a Quote
              </Button>
            </Link>
            <Link to="/shop">
              <Button
                size="sm"
                className="bg-[#1a6b3c] text-white hover:bg-[#145530]"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="shell flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.href.startsWith("/") ? (item.href as "/") : "/"}
                onClick={() => setOpen(false)}
                className={`border-b border-gray-100 py-3 text-sm font-medium transition-colors hover:text-[#1a6b3c] ${
                  item.active ? "text-[#1a6b3c]" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex gap-2">
              <Link to="/checkout" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full border-[#1a6b3c] text-[#1a6b3c]">
                  Request a Quote
                </Button>
              </Link>
              <Link to="/shop" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full bg-[#1a6b3c] text-white hover:bg-[#145530]">
                  Order Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
