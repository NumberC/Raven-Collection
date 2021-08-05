import React, { Component } from "react";
import {Link} from "react-router-dom"
import "../App.css"
import ShoppingCart from "./ShoppingCart"

class Heading extends Component{

    render(){
        console.log(this.props.itemCount);
        return (
            <header>
                <Link to="/"><h5>Home</h5></Link>
                <Link to="/"><h1>The Raven Collection</h1></Link>
                <Link to="/cart"><ShoppingCart itemCount={this.props.itemCount}></ShoppingCart></Link>
            </header>
        );
    }
}

export default Heading;