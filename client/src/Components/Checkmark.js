import React, { Component } from "react";
import "../CSS/Checkmark.css"

class Checkmark extends Component {
    constructor(){
        super();
        this.shortTickRef = React.createRef();
        this.longTickRef = React.createRef();
    }

    checkmarkAnimation(){
        var shortTick = this.shortTickRef.current;
        var longTick = this.longTickRef.current;

        shortTick.style.animation = "shortCheckAnimation .5s forwards";
        longTick.style.animation = "longCheckAnimation .5s .3s forwards";
    }

    componentDidMount(){
        this.checkmarkAnimation();
    }

    render() {
        return (
            <div id="checkmarkContainer">
                <div id="checkmark">
                    <div ref={this.shortTickRef} id="checkmarkShortTick">
                    </div>
                    <div ref={this.longTickRef} id="checkmarkLongTick">
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkmark