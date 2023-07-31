import React, { Component } from 'react';
import Product from "../Components/Product"
import APIInterface from "../APIInterface"

class HomePage extends Component{
    constructor(){
        super()
        this.state = {products: null}
    }

    async getAllProductsFromAPI(){
        var products = await APIInterface.getAllProducts();
        if(products instanceof Array) return this.setState({products: products});
    }

    componentDidMount(){
        this.getAllProductsFromAPI();
    }

    render(){
        return(
            <div id="App">
                {this.state.products && this.state.products.map((obj, i) => 
                    <Product id={APIInterface.getProductID(obj)} title={APIInterface.getProductName(obj)} price={APIInterface.getProductPrice(obj)} />
                )}
                {[...Array(8)].map((obj, i) => (
                    <Product id={1} title={"Funko Pop"} price={9.99} />
                ))}
            </div>
        )
    }
}

export default HomePage