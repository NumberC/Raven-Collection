import React, { Component } from 'react';
import "../CSS/ProductPage.css";
import StarRatings from 'react-star-ratings';
import APIInterface from '../APIInterface';

class ProductPage extends Component {

    constructor(props){
        super(props)
        this.setState({
            id: parseInt(props.match.params.id),
            name: null,
            price: null
        });
    }

    static getDerivedStateFromProps(props, state){
        if (!props.match.params.id) return null;
        return {
            id: parseInt(props.match.params.id)
        };
    }

    async getItemData(){
        var product = await APIInterface.getProduct(this.state.id);
        var name = APIInterface.getProductName(product);
        var price = APIInterface.getProductPrice(product);

        this.setState({name: name, price: price})
    }

    componentDidMount() {
        // this.productImagesScroll();
        // this.imagesToThumbnail();
        this.getItemData();
    }

    // productImagesScroll(){
    //     var productImages = $("#productImages");
    //     var scrollPos = 0;
    //     const speed = 0.3;
    //     productImages.on("wheel", (e) => {
    //         var my = e.originalEvent.deltaY * speed;
    //         scrollPos += my;
    //         productImages.scrollLeft(scrollPos);
    //     })
    // }

    // imagesToThumbnail(){
    //     var images = $(".images");
    //     var mainImage = $("#mainImage");
    //     images.on("mouseover", (e) => {
    //         var image = e.currentTarget;
    //         var link = image.getAttribute("src");
    //         mainImage.attr("src", link);
    //     })
    // }

    addToCart(){
        if(this.state.id && this.state.name && this.state.price)
        this.props.addItem(this.state.id, this.state.name, this.state.price);
    }

    render() {
        var rating = 4.5;

        return (
            <div id="productPageContainer">
                <div id="productImagesContainer">
                    <img id="mainImage" class="images" src="https://m.media-amazon.com/images/I/51-ZYnAU-SL._AC_.jpg" alt="Main Thumbnail"></img>
                    <div id="productImages" >
                        <img class="images" alt="example" src="https://m.media-amazon.com/images/I/51-ZYnAU-SL._AC_.jpg"></img>
                        <img class="images" alt="example" src="https://is5-ssl.mzstatic.com/image/thumb/Purple60/v4/93/9e/82/939e82b8-81e7-3b2b-2c3c-ce63d4bdec3c/source/512x512bb.jpg"></img>
                        <img class="images" alt="example" src="https://m.media-amazon.com/images/I/51-ZYnAU-SL._AC_.jpg"></img>
                    </div>
                </div>
                <div>
                    <h1>{(this.state.name) ? this.state.name:"Loading"}</h1>
                    <h2>{(this.state.price) ? "$"+this.state.price:"Loading"}</h2>

                    <div>
                        <StarRatings
                            name="rate1"
                            numberOfStars={5}
                            rating={rating}
                            starDimension={"2em"}
                        />
                    </div>
                    <div id="productCallToAction">
                        {/* <button>Buy Now</button> */}
                        <button onClick={this.addToCart.bind(this)}>Add To Cart</button>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget nibh sodales, feugiat eros a, volutpat dui. Curabitur rutrum velit nec tortor porttitor, in tempor sem semper. Ut tristique tortor et purus finibus, vitae rhoncus orci tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus neque, scelerisque nec massa ut, auctor accumsan ipsum. Nulla tristique enim non sodales cursus. Phasellus eget scelerisque arcu. Mauris mattis vulputate eros, at consectetur erat iaculis sed. Nunc id felis dui. Sed vitae euismod purus. Proin facilisis elit non nisl pulvinar, vel finibus nibh fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur felis lectus, accumsan vitae enim id, varius mattis magna. Vestibulum finibus, arcu sit amet pellentesque interdum, arcu tellus pharetra mauris, aliquet elementum orci arcu ullamcorper urna. Morbi placerat volutpat luctus. Praesent lobortis scelerisque imperdiet.
                    </p>
                </div>
            </div>
        )
    }
}

export default ProductPage