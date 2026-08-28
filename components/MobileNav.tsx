"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { BoxIcon, CartIcon, GridIcon, HeartIcon, HomeIcon } from "@/components/icons";

const items = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/wishlist", label: "Wishlist", Icon: HeartIcon },
  { href: "/cart", label: "Cart", Icon: CartIcon },
  { href: "/orders", label: "Orders", Icon: BoxIcon },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { cartCount } = useStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-5">
        {items.slice(0, 2).map(({ href, label, Icon }) => (
          <Tab key={href} href={href} label={label} active={pathname === href}>
            <Icon className="h-5.5 w-5.5" />
          </Tab>
        ))}

        <Tab href="/categories" label="Categories" active={pathname.startsWith("/category")}>
          <GridIcon className="h-5.5 w-5.5" />
        </Tab>

        {items.slice(2).map(({ href, label, Icon }) => (
          <Tab key={href} href={href} label={label} active={pathname === href}>
            <span className="relative">
              <Icon className="h-5.5 w-5.5" />
              {href === "/cart" && cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </span>
          </Tab>
        ))}
      </div>
    </nav>
  );
}

function Tab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition ${
        active ? "text-blue-600" : "text-slate-500"
      }`}
    >
      {children}
      {label}
    </Link>
  );
}
