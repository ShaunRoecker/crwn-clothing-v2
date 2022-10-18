require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try{
        const request = require("request");
        const { amount } = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntent.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
            metadata: {},
        });

        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        };

    } catch {
        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        };
    }
};
