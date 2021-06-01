import Link from 'next/link';
const initStripe = require('stripe');
import { processSubscription } from '../utils/payment';
import { useUser } from '@auth0/nextjs-auth0';

const PricingPage = ({ plans }) => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-center w-full">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col mx-2 text-gray-700 bg-white h-80 w-80"
        >
          <h2 className="py-8 text-4xl font-medium text-center border-b border-gray-300">
            {plan.name}
          </h2>
          <p className="flex flex-col items-center flex-1 p-8">
            <span className="text-3xl text-gray-600">
              ${plan.price / 100}
              <span className="text-sm text-gray-400 uppercase">
                {plan.currency}
              </span>
            </span>
            <span className="text-xl text-gray-400">{plan.interval}ly</span>
          </p>
          {user ? (
            <button
              className="py-4 text-center bg-green-200"
              onClick={() => processSubscription(plan.id)}
            >
              Subscribe
            </button>
          ) : (
            <Link href="/api/auth/login">
              <a className="py-4 text-center bg-green-200">Create account</a>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
  const { data: prices } = await stripe.prices.list();
  const plans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(price.product);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount,
        interval: price.recurring.interval,
        currency: price.currency,
      };
    })
  );

  return {
    props: {
      plans: plans.reverse(),
    },
  };
};

export default PricingPage;
