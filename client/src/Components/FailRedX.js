import React, { Component } from "react";
import "../CSS/FailRedX.css"

class FailRedX extends Component{

    constructor(){
        super();
        this.leftXRef = React.createRef();
        this.rightXRef = React.createRef();
    }

    redXAnimation(){
        var leftX = this.leftXRef.current;
        var rightX = this.rightXRef.current;

        leftX.style.animation = "leftXStickAnimation .5s forwards";
        rightX.style.animation = "rightXStickAnimation .6s forwards";
    }

    componentDidMount(){
        this.redXAnimation();
    }

    render(){
        return (
            <div id="failRedX">
                <div id="redX">
                    <div ref={this.leftXRef} id="leftX">
                    </div>
                    <div ref={this.rightXRef} id="rightX">
                    </div>
                </div>
            </div>
        );
    }
}

export default FailRedX