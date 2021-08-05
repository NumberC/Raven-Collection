const Database = require("./Database");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

class Payment {
    // TODO: include sales tax and shipping
    static async calculatePrice(cartItems){
        var total = 0;
        for(const product of cartItems){
            var cartItemPriceAsString = await Database.getProductPrice(product.id)
            total += parseFloat(cartItemPriceAsString) * parseInt(product.qty);
        }
        return total;
    }

    static async createPaymentIntent(cartItems){
        var total = await this.calculatePrice(cartItems);
        var totalInCents = total * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.floor(totalInCents),
            currency: "usd",
            payment_method_types: ["card"]
        });

        return paymentIntent.client_secret;
    }

    static async updatePaymentIntent(paymentIntentID, cartItems){
        var total = await this.calculatePrice(cartItems);
        var totalInCents = total * 100;

        return await stripe.paymentIntents.update(paymentIntentID, {
            amount: Math.floor(totalInCents)
        });
    }
}

module.exports = Payment;