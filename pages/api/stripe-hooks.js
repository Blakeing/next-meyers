export default async (req, res) => {
  // check what kind of event stripe has sent us
  res.send({ received: true });
};
