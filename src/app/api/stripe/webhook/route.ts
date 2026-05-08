import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role key to bypass RLS in webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === "checkout.session.completed") {
    const userId = session?.metadata?.userId;
    const planName = session?.metadata?.planName;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    // Update word limit based on plan
    let wordLimit = 1000;
    if (planName === "Pro") wordLimit = 10000;
    if (planName === "Business") wordLimit = 100000;

    const { error } = await supabaseAdmin
      .from("usage")
      .update({ 
        plan: planName, 
        words_limit: wordLimit,
        updated_at: new Date().toISOString() 
      })
      .eq("user_id", userId);

    if (error) {
      console.error("[WEBHOOK_UPDATE_ERROR]", error);
      return new NextResponse("Database update failed", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
