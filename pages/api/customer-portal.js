import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import initStripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

module.exports = withApiAuthRequired(async (req, res) => {
  const {
    user: { email },
  } = getSession(req, res);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  await prisma.$disconnect();

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeId,
    return_url: process.env.CLIENT_URL,
  });

  res.send({
    url: session.url,
  });
});
