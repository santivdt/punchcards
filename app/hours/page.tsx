import Header from "@/components/header";
import { requireUser } from "@/utils/auth";

export default async function ClientsPage() {
  await requireUser();

  return (
    <div className="w-full py-8">
      <Header title="Hours" />
    </div>
  );
}
