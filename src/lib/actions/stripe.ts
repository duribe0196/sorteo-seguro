import * as stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
const stripeClient = new stripe.Stripe(stripeSecretKey);

export const getSubscriptionProducts = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const products = await stripeClient.products.list({});
  const promises = products.data.map(async (product) => {
    if (product.default_price && typeof product.default_price === "string") {
      const price = await stripeClient.prices.retrieve(product.default_price);
      const paymentLink = await stripeClient.paymentLinks.create({
        line_items: [
          {
            price: product.default_price,
            quantity: 1,
          },
        ],
        after_completion: {
          type: "redirect",
          redirect: { url: `${process.env.DOMAIN}/payment-result` },
        },
        metadata: {
          userEmail: session.user.email,
          userId: session.user._id,
        },
      });

      const subscriptions = await stripeClient.subscriptions.list({
        price: product.default_price,
        status: "active",
      });

      // @ts-ignore
      product.price = {
        unitAmount: price.unit_amount ? price.unit_amount / 100 : null, // El precio en centavos convertido a la moneda
        currency: price.currency,
        recurring: price.recurring ? price.recurring.interval : null,
      };
      // @ts-ignore
      product.subscribersCount = subscriptions.data.length;
      // @ts-ignore
      product.paymentLink = paymentLink.url;
    }
  });
  await Promise.all(promises);

  return products.data;
};

export const getSubscriptionProductById = async (
  subscriptionProductId: string,
) => {
  return await stripeClient.products.retrieve(subscriptionProductId);
};

export const deleteCustomer = async (customerId: string) => {
  try {
    await stripeClient.customers.del(customerId);
    return {
      success: true,
      fail: false,
      message: "Usuario eliminado correctamente",
    };
  } catch (e) {
    return {
      success: false,
      fail: true,
      message: "Hubo un error al eliminar el usuario",
    };
  }
};
