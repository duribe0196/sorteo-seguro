import PlansTable from "@/app/components/client/PlansTable";

async function getPlans() {
  try {
    const baseUrl = process.env.MERCADO_PAGO_BASE_URL!;
    const response = await fetch(`${baseUrl}/preapproval_plan/search`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN!}`,
      },
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (e: any) {
    console.error(
      `Something went wrong getting plans from mercado pago ${e.message}`,
    );
  }
}

const columns = [
  {
    key: "reason",
    label: "Razon",
  },
  {
    key: "price",
    label: "Precio",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "subscribed",
    label: "Subscriptores",
  },
  {
    key: "frequency",
    label: "Frequencia",
  },
  {
    key: "billingDay",
    label: "Dia de cobro",
  },
];

export default async function GetPlans() {
  const plans = await getPlans();

  return <PlansTable plans={plans.results} columns={columns} />;
}
