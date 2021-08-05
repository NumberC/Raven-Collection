import { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/ProductCartListing.css";

class ProductCartListing extends Component{

    onQtyChange(e){
        var newQty = e.nativeEvent.data;
        this.props.setItemQty(this.props.id, newQty);
    }

    render(){
        console.log(this.props.qty);       
        return(
            <div id="productCartListing">
                <Link to={"/item/"+this.props.id}>
                    <img id="productCartListingThumbnail" src="https://m.media-amazon.com/images/I/51-ZYnAU-SL._AC_.jpg" alt="Item Thumbnail"></img>
                </Link>
                <div id="productCartInfo">
                    <div>
                        <h1>{this.props.name}</h1>
                        <h4>${this.props.price}</h4>
                    </div>
                    <div>
                        <label for="qtyInput">Qty: </label>
                        <input onChange={this.onQtyChange.bind(this)} type="number" id="qtyInput" min="0" value={this.props.qty}></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCartListing