import { getUsers } from "@/lib/actions/users";
import UsersTable from "@/app/components/client/UsersTable";

const columns = [
  {
    key: "_id",
    label: "user ID",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "subscriptionStatus",
    label: "Subscripcion",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export default async function GetUsers() {
  const users = await getUsers();
  return <>{<UsersTable columns={columns} users={users} />}</>;
}
