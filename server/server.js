require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const Database = require("./Database");
const Payment = require("./Payment");
const Email = require("./Email");

const payment = new Payment();

// TODO: what does all this do?
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/", async (req, res) => {
    var allProducts = await Database.getAllProducts();
    return res.send(allProducts);
})

app.get("/item/:id", async (req, res) => {
    var productID = req.params.id;
    var product = await Database.getProduct(productID);

    if(!product) return res.sendStatus(404);
    return res.send(product);
})

app.post("/create-payment-intent", async (req, res) => {
    var cartItems = req.body.cart_items;
    var clientSecret = await Payment.createPaymentIntent(cartItems);
    return res.send({client_secret: clientSecret});
})

app.post("/update-payment-intent", async (req, res) => {
    var paymentIntentID = req.body.payment_intent_id;
    var cartItems = req.body.cart_items;
    await Payment.updatePaymentIntent(paymentIntentID, cartItems);
    return res.sendStatus(200);
})

app.listen(port, (req, res) =>{});