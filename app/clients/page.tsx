import { getClientsFromUser } from "@/app/clients/actions";
import CreateClientDialog from "@/app/clients/create";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/utils/auth";

export default async function ClientsPage() {
  const user = await requireUser();
  const { data: clients } = await getClientsFromUser(user.id);

  return (
    <>
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
