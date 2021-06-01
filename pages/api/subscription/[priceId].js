import initStripe from 'stripe';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = withApiAuthRequired(async (req, res) => {
  const { priceId } = req.query;
  const {
    user: { email },
  } = getSession(req, res);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  await prisma.$disconnect();

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancelled`,
    metadata: {
      userId: user.id,
    },
  });

  res.json({ id: session.id });
});
