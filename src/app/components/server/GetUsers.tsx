import { getUsers } from "@/lib/actions/mercadopago";
import UsersTable from "@/app/components/client/UsersTable";

const columns = [
  {
    key: "id",
    label: "Customer Id",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "ccNumber",
    label: "Identificación",
  },
  {
    key: "date_created",
    label: "Cliente desde",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export default async function GetUsers() {
  const users = await getUsers();
  return (
    <>
      <UsersTable columns={columns} users={users.results} />
    </>
  );
}
