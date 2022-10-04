import React from 'react';

const array = ['2.jpg','3.jpg','4.jpg','4.jpg','2.jpg','3.jpg']
let move = 0

export default class Main extends React.Component{
    constructor() {
        super()
        this.state = {
            move: 0
        }
        this.click = this.click.bind(this)
    }

    click (event) {
        console.log(event.movementX)
        move += event.movementX
        this.setState({move: 1})
    }

    render(){
        return (<div onMouseMove={this.click}>
            <img src={array[0]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[1]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[2]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[3]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[4]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[5]} width="50" height="50" style={{"translate": move + "px"}}></img>
        </div>);
    }
}
