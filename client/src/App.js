import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Heading from "./Components/Heading"
import Footer from "./Components/Footer"
import ProductPage from "./Pages/ProductPage"
import HomePage from "./Pages/HomePage"
import CheckoutPage from "./Pages/CheckoutPage"
import APIInterface from './APIInterface';

class App extends Component {

  /*

  {
    id: 2,
    qty: 3,
  }

  */
  constructor() {
    super()
    this.state = {
      cartItems: [],
      client_secret: null
    }
  }

  getClientSecret() {
    return this.state.client_secret;
  }

  setClientSecret(newClientSecret) {
    this.setState({ client_secret: newClientSecret });
  }

  getItemCount() { return this.state.cartItems.length; }

  setItemQty(id, newQty) {
    if (newQty != 0) {
      var mappedCart = this.state.cartItems.map(x => (x.id === id) ? { id: x.id, name: x.name, price: x.price, qty: newQty } : x);
      this.setState({ cartItems: mappedCart });
    } else {
      // Removes a cart item with specified id that has quantity of 0
      var newCartItems = this.state.cartItems.filter(x => x.id !== id)
      this.setState({ cartItems: newCartItems })
    }
  }

  // adds an item with a quantity to the cart; to remove a certain amount, put a negative quantity
  // TODO: handle negative input
  addItem(productID, name, price) {
    var productInCart = this.state.cartItems.find(x => x.id === productID);

    if (productInCart) {
      this.setItemQty(productID, productInCart.qty + 1)
    } else {
      var itemToAdd = {
        id: productID,
        name: name,
        price: price,
        qty: 1
      };

      this.setState({
        cartItems: [...this.state.cartItems, itemToAdd]
      });
    }
  }

  clearCart(){
    this.setState({cartItems: []});
  }

  render() {
    return (
      <BrowserRouter>
        <Heading itemCount={this.state.cartItems.length} />
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/item/:id" exact render={(props) => (
            <ProductPage {...props} addItem={this.addItem.bind(this)}></ProductPage>
          )}></Route>
          <Route path="/cart" exact render={(props) => (
            <CheckoutPage {...props} 
            getClientSecret={this.getClientSecret.bind(this)} 
            setClientSecret={this.setClientSecret.bind(this)} 
            setItemQty={this.setItemQty.bind(this)} 
            cartItems={this.state.cartItems}
            clearCart={this.clearCart.bind(this)}></CheckoutPage>
          )}></Route>
        </Switch>
        {/* <Footer></Footer> */}
      </BrowserRouter>
    );
  }
}

export default App;
