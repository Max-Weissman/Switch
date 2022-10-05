import React from 'react';

const array = ['2.jpg','3.jpg','4.jpg','4.jpg','2.jpg','3.jpg']
let move = 0
let clicked = false

export default class Main extends React.Component{
    constructor() {
        super()
        this.state = {
            move: 0
        }
        this.scroll = this.scroll.bind(this)
    }

    click () {
        clicked = true
    }

    unclick () {
        clicked = false
    }

    scroll (event) {
        event.preventDefault()
        if (clicked){
            move += event.movementX
            if (move > 49){
                move = 0
                let shift = array.pop()
                array.unshift(shift)
            }
            if (move < -49){
                move = 0
                let shift = array.shift()
                array.push(shift)
            }
            this.setState({move: 1})
        }
    }

    render(){
        return (<div className='waterwheel' onMouseMove={this.scroll} onMouseDown={this.click} onMouseUp={this.unclick} onMouseLeave={this.unclick}>
            <img src={array[0]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[1]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[2]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[3]} width="50" height="50" style={{"translate": move + "px"}}></img>
            <img src={array[4]} width="50" height="50" style={{"translate": move + "px"}}></img>
        </div>);
    }
}
