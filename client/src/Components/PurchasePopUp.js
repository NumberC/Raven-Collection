import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "../CSS/PurchasePopUp.css"
import Checkmark from "./Checkmark";
import FailRedX from "./FailRedX";

const successfulAnimationCSS = {
    animation: "completeSuccess 2s ease-in-out",
    animationFillMode: "forwards"
}

const failedAnimationCSS = {
    animation: "completeFail 2s ease-in-out",
    animationFillMode: "forwards"
}


class PurchasePopUp extends Component {
    render() {
        return (
            <div class="modal">
                <div id="PurchasePopUp">
                    <div id="loadingIcons">
                        <div style={
                            this.props.isSuccessful ? successfulAnimationCSS :
                                this.props.isFailed ? failedAnimationCSS :
                                    null
                        } class="loadingBorder"></div>
                        {this.props.isSuccessful && <Checkmark></Checkmark>}
                        {this.props.isFailed && <FailRedX></FailRedX>}
                    </div>
                    {
                        this.props.isSuccessful ? <p>Your order is complete</p> :
                        this.props.isFailed ? <p>Your order failed. Please try again.</p> :
                        <p>Your order is processing</p>
                    }
                    {this.props.isSuccessful && <Link to="/"><button onClick={this.props.clearCart.bind(this)}>Go back home</button></Link>}
                    {this.props.isFailed && <button onClick={this.props.togglePopUpOff}>Try again</button>}
                </div>
            </div>
        );
    }
}

export default PurchasePopUp