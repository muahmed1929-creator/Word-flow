import { stripe } from "@/lib/stripe";
import { plans as stripePlans } from "@/lib/constants";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { priceId, planName } = await req.json();
    
    // Verify priceId from our constants for security
    const isValidPlan = Object.values(stripePlans).some(p => p.id === priceId);
    if (!isValidPlan) {
      return new NextResponse("Invalid Price ID", { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planName: planName,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse(error.message || "Internal Error", { status: 500 });
  }
}
