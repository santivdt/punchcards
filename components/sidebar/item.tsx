"use client";

import { cn } from "@/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export type ItemProps = {
  label: string;
  href: LinkProps["href"];
};

export default function Item({ href, label }: ItemProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "block py-2 px-4 rounded-xl hover:bg-neutral-100 text-neutral-500 transition-colors",
        pathname === href &&
          "bg-neutral-100 hover:bg-neutral-200 text-foreground"
      )}
    >
      {label}
    </Link>
  );
}
