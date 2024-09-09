import * as stripe from "stripe";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
const webhookSecretKey = process.env.STRIPE_WEBHOOK_SECRET!;
const stripeClient = new stripe.Stripe(stripeSecretKey);

export async function POST(request: Request, response: Response) {
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return new Response("stripe-signature is not present", { status: 400 });
  }

  let event;
  if (process.env.NODE_ENV === "development") {
    event = await request.json();
  } else {
    try {
      const body = await request.text();
      event = stripeClient.webhooks.constructEvent(body, sig, webhookSecretKey);
    } catch (err: any) {
      console.log("Error while decode stripe event", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  }

  if (!event) {
    return new Response(`No event message`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const paymentData = event.data.object;
      console.log("PaymentIntent was successful!", paymentData);
      return new Response("OK");

    case "invoice.payment_succeeded":
      const subscriptionPayment = event.data.object;
      console.log("SubscriptionPayment was successful", subscriptionPayment);
      return new Response("OK");

    case "invoice.payment_failed":
      const subscriptionPaymentFailedData = event.data.object;
      console.log(
        "subscriptionPaymentFailedData",
        subscriptionPaymentFailedData,
      );
      return new Response("OK");
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}
