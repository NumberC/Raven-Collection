import { Component } from "react";
import "@stripe/react-stripe-js"
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../CSS/StripeCheckout.css"
import APIInterface from "../APIInterface";
import PurchasePopUp from "./PurchasePopUp";

const cardOptions = {
    style: {
        base: {
            fontSize: "20px",
            lineHeight: "50px"
        }
    }
}

class StripeCheckout extends Component {
    constructor() {
        super()
        this.state = {
            validForm: false,
            isDisabled: false,
            popUpActive: false,
            popUpStatus: {
                isSuccessful: false,
                isFailed: false
            }
        };
    }

    togglePopUpOn() {
        this.setState({
            popUpActive: true
        })
    }

    togglePopUpOff() {
        this.setState({
            popUpActive: false
        })
    }

    async makePaymentIntent() {
        if (this.props.cartItems.length <= 0) return;

        var mappedCartItems = this.props.cartItems.map(x => ({ id: x.id, qty: x.qty }));

        var clientSecret = await APIInterface.createPaymentIntent(mappedCartItems);
        this.props.setClientSecret(clientSecret);
        return clientSecret;
    }

    componentDidUpdate() {
        const elements = this.props.elements;
        if (!elements) return;

        var card = elements.getElement(CardElement);
        card.update({ disabled: this.state.isDisabled })
        card.on("change", (event) => {
            if (event.complete !== this.state.validForm)
                this.setState({
                    validForm: event.complete
                });
        })
    }

    async wait(s) {
        return new Promise((resolve, reject) =>
            setTimeout(resolve, s * 1000)
        )
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.state.validForm) return;
        this.setState({ popUpActive: true });

        // reduce each product to just id and quantity
        // var mappedCartItems = this.props.cartItems.map(x => ({ id: x.id, qty: x.qty }));

        const stripe = this.props.stripe;
        const elements = this.props.elements;
        const clientSecret = (this.props.getClientSecret()) ? this.props.getClientSecret() : (await this.makePaymentIntent());
        console.log(elements.getElement(CardElement));

        if (!clientSecret)
            return this.setState({
                popUpStatus: {
                    isSuccessful: false,
                    isFailed: true
                }
            })


        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        // TODO: display error message with payload.error.message
        var failed = payload.error;
        if (failed) console.log(failed.message);

        return this.setState({
            popUpStatus: {
                isSuccessful: !failed,
                isFailed: failed
            }
        })

    }

    getTotalPrice() {
        var total = 0;
        var salesTax = .06;
        this.props.cartItems.map(x => total += x.qty * x.price)
        return Math.round(total * (1 + salesTax) * 100) / 100;
    }

    render() {
        //TODO: make card element required
        return (
            <form id="checkoutForm" onSubmit={this.handleSubmit.bind(this)}>
                {this.state.popUpActive &&
                    <PurchasePopUp
                        isSuccessful={this.state.popUpStatus.isSuccessful}
                        isFailed={this.state.popUpStatus.isFailed}
                        clearCart={this.props.clearCart.bind(this)}
                        togglePopUpOff={this.togglePopUpOff.bind(this)}></PurchasePopUp>}
                <div id="nameForm">
                    <div id="firstNameDiv">
                        <label for="firstName">First Name </label>
                        <input id="firstName" type="text" disabled={this.state.isDisabled} required></input>
                    </div>
                    <div id="lastNameDiv">
                        <label for="lastName">Last Name </label>
                        <input id="lastName" type="text" disabled={this.state.isDisabled} required></input>
                    </div>
                </div>
                <div class="fullLengthInputDiv">
                    <label>Email </label>
                    <input id="emailCheckout" type="email" disabled={this.state.isDisabled} required></input>
                </div>
                <div class="fullLengthInputDiv">
                    <label for="addressLine1">Address Line 1 </label>
                    <input id="addressLine1" type="text" disabled={this.state.isDisabled} required></input>
                </div>
                <div class="fullLengthInputDiv">
                    <label for="addressLine2">Address Line 2 </label>
                    <input id="addressLine2" type="text" disabled={this.state.isDisabled}></input>
                </div>
                <div id="townAndZipDiv">
                    <div>
                        <label for="townOrCity">Town/City </label>
                        <input id="townOrCity" type="text" disabled={this.state.isDisabled} required></input>
                    </div>
                    <div>
                        <label for="stateInput">State </label>
                        <input id="stateInput" type="dropdown" disabled={this.state.isDisabled} required></input>
                    </div>
                    <div>
                        <label for="zipCode">Zip Code </label>
                        <input id="zipCode" type="text" disabled={this.state.isDisabled} required></input>
                    </div>
                </div>
                <div>
                    <CardElement options={cardOptions} required></CardElement> {/* is required an option? */}
                </div>
                <button id="CheckoutBtn" type="submit" disabled={!this.state.validForm || this.props.cartItems.length <= 0}>Pay ${this.getTotalPrice()}</button>
            </form>
        );
    }
}

const InjectedCheckoutForm = (props) => {
    return (
        <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE)}>
            <ElementsConsumer>
                {({ elements, stripe }) => (
                    <StripeCheckout
                        getClientSecret={props.getClientSecret.bind(this)}
                        setClientSecret={props.setClientSecret.bind(this)}
                        cartItems={props.cartItems}
                        clearCart={props.clearCart.bind(this)}
                        elements={elements}
                        stripe={stripe}
                    />
                )}
            </ElementsConsumer>
        </Elements>

    );
};

export default InjectedCheckoutForm