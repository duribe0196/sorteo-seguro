"use server";

import {
  Customer,
  CustomerCard,
  MercadoPagoConfig,
  PreApproval,
  PreApprovalPlan,
} from "mercadopago";
import { CustomerRequestBody } from "mercadopago/dist/clients/customer/commonTypes";
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from "@mercadopago/sdk-react/bricks/cardPayment/type";
import { revalidatePath } from "next/cache";
import { saveCustomerIdFromMercadoPago } from "@/lib/actions/users";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});
const customerClient = new Customer(client);
const customerCardClient = new CustomerCard(client);
const subscriptionClient = new PreApproval(client);
const planClient = new PreApprovalPlan(client);

export const getPlans = async () => {
  const foundPlans = await planClient.search();
  return foundPlans.results;
};

export const getCustomerWithCards = async (customerId: string) => {
  try {
    return await customerClient.get({ customerId: customerId });
  } catch (e) {
    console.error("Error obteniendo el customer con id", customerId);
    console.error(e);
    return null;
  }
};

export const getPlanById = async (planId: string) => {
  try {
    return await planClient.get({ preApprovalPlanId: planId });
  } catch (e) {
    console.error(e);
  }
};

export const createNewSubscription = async (
  args: ICardPaymentFormData<ICardPaymentBrickPayer>,
  planId: string,
) => {
  try {
    if (!planId) {
      return {
        message: "Plan id es requerido",
        fail: true,
        success: false,
      };
    }
    const body: CustomerRequestBody = {
      email: args.payer.email,
      identification: {
        type: args.payer.identification?.type,
        number: args.payer.identification?.number,
      },
    };
    const customerFound = await customerClient.search({
      options: { email: args.payer.email! },
    });
    // Get or create the customer in mercado pago
    const customer = customerFound.results?.length
      ? customerFound.results[0]
      : await customerClient.create({ body });
    const result = await saveCustomerIdFromMercadoPago({
      email: args.payer.email!,
      customerId: customer.id!,
    });

    // Get the plan in mercado pago
    const plan = await planClient.get({ preApprovalPlanId: planId });
    if (!plan.id) {
      return {
        message: `Plan con id ${planId} no existe`,
        fail: true,
        success: false,
      };
    }

    //message: CC_VAL_433 Credit card validation has failed'
    //code: cc_rejected_blacklist'
    // status: 401

    //Create subscription in mercado pago
    const subscriptionResponse = await subscriptionClient.create({
      body: {
        preapproval_plan_id: plan.id,
        payer_email: args.payer.email!,
        card_token_id: args.token,
      },
    });

    const customerCardResponse = await customerCardClient.create({
      customerId: customer.id!,
      body: { token: args.token },
    });
    console.log("SUBSCRIPTION RESPONSE", subscriptionResponse);
    console.log("CUSTOMER CARD RESPONSE", customerCardResponse);
    //here we need to store a customer card client into

    return {
      message: "Usuario subscrito exitosamente",
      fail: false,
      success: true,
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (e: any) {
    console.error(`Error subscribiendo al usuario al plan con id ${planId}`);
    console.error(e);
    return {
      message: `No se pudo completar la subscripción, descripción: ${e.message}`,
      fail: true,
      success: false,
    };
  }
};

export const getUsers = async () => {
  return await customerClient.search();
};

export const deleteUser = async (customerId: string) => {
  try {
    await customerClient.remove({ customerId: customerId });
    revalidatePath("/admin/users");
    return {
      fail: false,
      success: true,
      message: "OK",
    };
  } catch (e) {
    console.error(e);
    return {
      fail: true,
      success: false,
      message: "Hubo un error al eliminar al usuario",
    };
  }
};
