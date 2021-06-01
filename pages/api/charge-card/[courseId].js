import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import initStripe from "stripe";

const prisma = new PrismaClient();
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = withApiAuthRequired(async (req, res) => {
  try {
    const { courseId } = req.query;
    const {
      user: { email },
    } = getSession(req, res);

    const course = prisma.course.findUnique({
      where: {
        id: parseInt(courseId),
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const lineItems = [
      {
        price_data: {
          currency: "aud", // swap this out for your currency
          product_data: {
            name: course.title,
          },
          unit_amount: course.price,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      customer: user.stripeId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancelled`,
      payment_intent_data: {
        metadata: {
          userId: user.id,
          courseId,
        },
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    res.send(err);
  } finally {
    await prisma.$disconnect();
  }
});
