import { findUserPopulated } from "@/lib/actions/users";
import { SaveReferralForm } from "@/app/components/client/SaveReferralForm";
import { Divider } from "@nextui-org/divider";
import { ReferralsTable } from "@/app/components/client/ReferralsTable";

const columns = [
  {
    key: "email",
    label: "Correo Electronico",
  },
  {
    key: "name",
    label: "Nombre",
  },
];

export async function ListReferrals(props: any) {
  const user = await findUserPopulated(props.email);

  const referrals = user.referrals?.map((referral: any) => {
    return {
      name: referral.name,
      email: referral.email,
    };
  });

  return (
    <div>
      {!user?.referredBy ? (
        <SaveReferralForm />
      ) : (
        <span>Referido por {user.referredBy.email}</span>
      )}

      <div className={"mt-2"}>
        <Divider />
        {user.referrals.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold leading-7 text-gray-900 mt-2">
              Mis Referidos
            </h3>
            <ReferralsTable columns={columns} referrals={referrals || []} />
          </>
        ) : (
          <div className={"p-4"}>
            <h3 className="text-xl font-semibold leading-7 text-gray-900">
              No tienes referidos 😕
            </h3>
            <p>Invita a otras personas a registrarse</p>
            <p>
              Una vez tu referido este registrado, puede ir a la seccion de
              referidos y debe escribir tu correo electronico:{" "}
              <strong>{user.email}</strong>
            </p>
            <p>
              Una vez haya escrito tu correo electronico aparecerá en tu lista
              de referidos y tendras los beneficios 🥳
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
