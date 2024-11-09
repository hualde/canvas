const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  try {
    console.log('Received request:', JSON.stringify(req.body));

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ message: 'Price ID is required' });
    }

    console.log('Creating Stripe checkout session with priceId:', priceId);
    console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Set' : 'Not set');

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/upgrade`,
    });

    console.log('Stripe session created:', session.id);

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe API Error:', error);
    if (error.type === 'StripeError') {
      return res.status(error.statusCode || 500).json({ 
        message: error.message,
        type: 'StripeError',
        code: error.code
      });
    }
    return res.status(500).json({ 
      message: 'An unexpected error occurred',
      type: 'UnknownError',
      error: error.message || String(error)
    });
  }
}