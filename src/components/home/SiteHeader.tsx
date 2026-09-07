import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
  X,
  LogOut,
  LayoutDashboard,
  Leaf,
  Apple,
  Beef,
  Carrot,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

// ── Nav items ────────────────────────────────────────────────────────────────
const nav = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Shop", href: "/shop", isRoute: true },
  { label: "About Us", href: "/#about", isRoute: false },
  { label: "Our Farms", href: "/#farms", isRoute: false },
  { label: "Certifications", href: "/#certifications", isRoute: false },
  { label: "Export Destinations", href: "/#exports", isRoute: false },
  { label: "Contact Us", href: "/#contact", isRoute: false },
];

// ── All-categories dropdown entries ─────────────────────────────────────────
const allCategories = [
  { label: "All Products", value: "all", icon: LayoutGrid },
  { label: "Fresh Fruits", value: "fruits", icon: Apple },
  { label: "Fresh Vegetables", value: "vegetables", icon: Carrot },
  { label: "Halal Meat", value: "meat", icon: Beef },
  { label: "Herbs & Spices", value: "herbs", icon: Leaf },
];

// ── Scroll helper ────────────────────────────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNavClick(href: string, isRoute: boolean, closeMenu: () => void) {
  closeMenu();
  if (!isRoute && href.includes("#")) {
    const hash = href.split("#")[1];
    // If already on homepage scroll directly, otherwise navigate then scroll
    if (window.location.pathname === "/") {
      scrollToSection(hash);
    } else {
      window.location.href = href;
    }
  }
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [search, setSearch] = useState("");
  const catRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const { totalItems, totalPrice, openCart } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) navigate({ to: "/shop", search: { q: search.trim(), category: undefined } });
  }

  function isActive(href: string) {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm">
      {/* ── Top row ── */}
      <div className="shell flex items-center gap-4 py-3 lg:gap-6">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-[#1a6b3c] bg-white shadow-sm">
            <svg
              viewBox="0 0 48 48"
              className="size-9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 22L24 8L40 22V40H30V30H18V40H8V22Z"
                fill="#1a6b3c"
                fillOpacity="0.15"
                stroke="#1a6b3c"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M24 36C24 28 30 24 36 24C36 32 30 36 24 36Z" fill="#1a6b3c" />
              <path
                d="M24 36C24 28 18 24 12 24C12 32 18 36 24 36Z"
                fill="#1a6b3c"
                fillOpacity="0.5"
              />
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

        {/* Search bar */}
        <form onSubmit={handleSearch} className="hidden flex-1 lg:flex">
          <div className="flex h-11 w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[#1a6b3c] focus-within:ring-1 focus-within:ring-[#1a6b3c]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-full items-center gap-1.5 bg-[#1a6b3c] px-4 text-white transition-colors hover:bg-[#145530]"
            >
              <Search className="size-4" />
            </button>
          </div>
        </form>

        {/* Account + Cart */}
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-0">
          {/* Account */}
          <div ref={userRef} className="relative hidden lg:block">
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
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-50">
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
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await signOut();
                        navigate({ to: "/" });
                      }}
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

          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex items-center gap-2.5"
          >
            <span className="relative">
              <ShoppingCart className="size-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#1a6b3c] text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="hidden leading-tight text-left lg:block">
              <span className="block text-xs text-gray-500">Cart</span>
              <span className="block text-sm font-semibold text-gray-800">
                ${totalPrice.toFixed(2)}
              </span>
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-gray-200 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      <div className="hidden border-t border-gray-200 bg-white lg:block">
        <div className="shell flex items-center gap-0 py-0">
          {/* ALL CATEGORIES dropdown */}
          <div ref={catRef} className="relative shrink-0">
            <button
              onClick={() => setCatOpen((v) => !v)}
              className="flex items-center gap-2 bg-[#1a6b3c] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#145530]"
            >
              <Menu className="size-4" />
              ALL CATEGORIES
              <ChevronDown
                className={`size-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`}
              />
            </button>

            {catOpen && (
              <div className="absolute left-0 top-full z-50 w-56 rounded-b-xl border border-t-0 border-gray-200 bg-white shadow-xl">
                {allCategories.map(({ label, value, icon: Icon }) => (
                  <Link
                    key={value}
                    to="/shop"
                    search={{ category: value, q: "" }}
                    onClick={() => setCatOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-[#1a6b3c]"
                  >
                    <Icon className="size-4 shrink-0 text-[#1a6b3c]" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex flex-1 items-center justify-center">
            {nav.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href as "/"}
                  className={`flex items-center px-3 py-3 text-sm font-medium transition-colors hover:text-[#1a6b3c] ${
                    isActive(item.href) ? "font-semibold text-[#1a6b3c]" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.includes("#")) {
                      e.preventDefault();
                      handleNavClick(item.href, item.isRoute, () => {});
                    }
                  }}
                  className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-[#1a6b3c]"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          {/* CTA buttons */}
          <div className="flex shrink-0 items-center gap-2 py-2">
            <Link to="/checkout">
              <Button
                variant="outline"
                size="sm"
                className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white"
              >
                Request a Quote
              </Button>
            </Link>
            <Link to="/shop" search={{ category: undefined, q: "" }}>
              <Button size="sm" className="bg-[#1a6b3c] text-white hover:bg-[#145530]">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile nav ── */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="shell pt-4">
            <div className="flex h-10 items-center overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[#1a6b3c]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="flex h-full items-center bg-[#1a6b3c] px-3 text-white"
              >
                <Search className="size-4" />
              </button>
            </div>
          </form>

          <nav className="shell flex flex-col py-4">
            {nav.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href as "/"}
                  onClick={() => setMobileOpen(false)}
                  className={`border-b border-gray-100 py-3 text-sm font-medium transition-colors hover:text-[#1a6b3c] ${
                    isActive(item.href) ? "font-semibold text-[#1a6b3c]" : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.includes("#")) {
                      e.preventDefault();
                      handleNavClick(item.href, item.isRoute, () => setMobileOpen(false));
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                  className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 transition-colors hover:text-[#1a6b3c]"
                >
                  {item.label}
                </a>
              ),
            )}

            {/* Mobile categories */}
            <div className="mt-3 mb-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Browse by Category
              </p>
              <div className="flex flex-wrap gap-2">
                {allCategories.map(({ label, value }) => (
                  <Link
                    key={value}
                    to="/shop"
                    search={{ category: value, q: "" }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile auth */}
            {user ? (
              <div className="mt-3 flex flex-col gap-1 border-t border-gray-100 pt-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-[#1a6b3c]"
                  >
                    <LayoutDashboard className="size-4" /> Admin Panel
                  </Link>
                )}
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm font-medium text-gray-700 hover:text-[#1a6b3c]"
                >
                  <User className="size-4" /> My Account
                </Link>
                <button
                  onClick={async () => {
                    setMobileOpen(false);
                    await signOut();
                    navigate({ to: "/" });
                  }}
                  className="flex items-center gap-2 py-2 text-sm font-medium text-red-500"
                >
                  <LogOut className="size-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full border-[#1a6b3c] text-[#1a6b3c]">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full bg-[#1a6b3c] text-white hover:bg-[#145530]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
              <Link to="/checkout" onClick={() => setMobileOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full border-[#1a6b3c] text-[#1a6b3c]">
                  Request a Quote
                </Button>
              </Link>
              <Link
                to="/shop"
                search={{ category: undefined, q: "" }}
                onClick={() => setMobileOpen(false)}
                className="flex-1"
              >
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
