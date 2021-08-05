import React, { Component } from 'react';
import '../CSS/Product.css';
import {Link} from "react-router-dom"

class Product extends Component{
    render(){
        return (
            <div class="product">
                <Link to={"/item/"+this.props.id} >
                    <img src="https://m.media-amazon.com/images/I/51-ZYnAU-SL._AC_.jpg" alt="Item Thumbnail"/>
                    <h2>{this.props.title}</h2>
                    <h3>${this.props.price}</h3>
                </Link>
            </div>
        );
    }
}

export default Product;