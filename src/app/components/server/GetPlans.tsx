import PlansTable from "@/app/components/client/PlansTable";
import { getSubscriptionProducts } from "@/lib/actions/stripe";

const columns = [
  {
    key: "description",
    label: "Descripcion",
  },
  {
    key: "price",
    label: "Precio",
  },
  {
    key: "active",
    label: "Activo",
  },
  {
    key: "subscribersCount",
    label: "Subscriptores",
  },
  {
    key: "frequency",
    label: "Frequencia",
  },
];

export default async function GetPlans() {
  const plans = await getSubscriptionProducts();

  return <PlansTable plans={plans} columns={columns} />;
}
