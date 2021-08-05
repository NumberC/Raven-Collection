import { Component } from "react";
import ProductCartListing from "../Components/ProductCartListing";
import StripeCheckout from "../Components/StripeCheckout";
import "../CSS/CheckoutPage.css"

class CheckoutPage extends Component {
    render() {
        return (
            <div id="CheckoutPage">
                <div id="productCartListings">
                    {this.props.cartItems.map(x =>
                        <ProductCartListing id={x.id} setItemQty={this.props.setItemQty.bind(this)} name={x.name} price={x.price} qty={x.qty}></ProductCartListing>
                    )}
                    {(this.props.cartItems.length === 0) && <h1>Add items to your cart</h1>}
                </div>
                <div id="checkoutWrapper">
                    <StripeCheckout
                        getClientSecret={this.props.getClientSecret.bind(this)}
                        setClientSecret={this.props.setClientSecret.bind(this)}
                        cartItems={this.props.cartItems}
                        clearCart={this.props.clearCart.bind(this)}></StripeCheckout>
                </div>

            </div>
        );
    }
}

export default CheckoutPage