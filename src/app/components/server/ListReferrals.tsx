import { findUserPopulated } from "@/lib/actions/users";
import { SaveReferralForm } from "@/app/components/client/SaveReferralForm";

export async function ListReferrals(props: any) {
  const user = await findUserPopulated(props.email);

  return (
    <div>
      {!user?.referredBy ? (
        <SaveReferralForm />
      ) : (
        <span>Referido por {user.referredBy.email}</span>
      )}
      <div className={"my-10"}>
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Mis Referidos
        </h3>
      </div>
    </div>
  );
}
