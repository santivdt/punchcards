import CreateClientDialog from "@/app/clients/create";
import AuthButton from "@/components/AuthButton";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .limit(10)
    .order("created_at", { ascending: false })
    .eq("user_id", user.id);

  return (
    <>
      <AuthButton />

      <h1>Clients</h1>

      <CreateClientDialog>
        <Button>Add Client</Button>
      </CreateClientDialog>

      {clients && clients.length > 0 && (
        <ul className="mt-4 w-full max-w-2xl">
          {clients.map((client) => (
            <li key={client.id} className="flex justify-between">
              <h3>{client.email}</h3>
              <h3>{client.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
