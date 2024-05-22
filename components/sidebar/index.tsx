import { signOut } from "@/app/login/actions";
import Item from "@/components/sidebar/item";
import { useOptionalUser } from "@/utils/auth";
import Link from "next/link";

export const menuItems = [
  { href: "/", label: "Home" },
  { href: "/clients", label: "Clients" },
  { href: "/cards", label: "Cards" },
  { href: "/hours", label: "Hours" },
];

export default async function Sidebar() {
  const user = await useOptionalUser();

  return (
    <aside className="w-full max-w-[200px] py-8 flex flex-col">
      {user ? (
        <>
          <ul className="flex-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Item {...item} />
              </li>
            ))}
          </ul>
          <form action={signOut}>
            <button>Logout</button>
          </form>
        </>
      ) : (
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      )}
    </aside>
  );
}
