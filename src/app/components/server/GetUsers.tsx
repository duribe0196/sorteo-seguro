import { getCustomers } from "@/lib/actions/stripe";
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
  const users = await getCustomers();
  console.log(users);
  return <>{/*<UsersTable columns={columns} users={users.data} />*/}</>;
}
