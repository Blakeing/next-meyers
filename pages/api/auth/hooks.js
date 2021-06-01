import { PrismaClient } from "@prisma/client";
import initStripe from "stripe";

const prisma = new PrismaClient();
const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  try {
    const { email, secret } = JSON.parse(req.body);
    if (secret === process.env.AUTH0_HOOK_SECRET) {
      const customer = await stripe.customers.create({
        email,
      });
      const user = await prisma.user.create({
        data: { email, stripeId: customer.id },
      });
      console.log("created user");
    } else {
      console.log("You forgot to send me your secret!");
    }
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
    res.send({ received: true });
  }
};
