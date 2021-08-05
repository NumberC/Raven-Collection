import axios from "axios";

const baseURL = "http://localhost:5000";

class APIInterface {

    static async getAllProducts(){
        var APICall = await axios.get(baseURL+"/");
        console.log(APICall.data);
        return APICall.data;
    }

    static async getProduct(id){
        // id must be a number
        if (!id instanceof Number) return;

        var APICall = await axios.get(baseURL + "/item/" + id);
        return APICall.data;
    }

    static getProductID(product){
        return product.id ? product.id:null;
    }

    static getProductPrice(product){
        return product.price ? product.price:null;
    }

    static getProductName(product){
        return product.name ? product.name:null;
    }

    static async createPaymentIntent(cartItems){
        var paymentIntent = await axios.post(baseURL + "/create-payment-intent", {
            cart_items: cartItems
        })
        return paymentIntent.data.client_secret;
    }

    static async updatePaymentIntent(paymentIntentID, cartItems){
        return await axios.post(baseURL + "/update-payment-intent", {
            payment_intent_id: paymentIntentID,
            cart_items: cartItems
        })
    }
}

export default APIInterface