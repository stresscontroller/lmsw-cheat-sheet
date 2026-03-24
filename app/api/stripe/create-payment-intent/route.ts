import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const json = await req.json();
  const { amount, currency } = json;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      // payment_method_types: ["card", "afterpay_clearpay", "klarna", "affirm"],
      // setup_future_usage: "off_session",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    throw new Error("Error creating payment intent.");
  }
}
