import React, { Component } from "react";

let move = 0
let clicked = false

class Slider extends Component{
    constructor() {
        super()
        this.state = {
            move: 0,
            shift: 0,
            decelerate: 0
        }
        this.decelerate = this.decelerate.bind(this)
        this.unclick = this.unclick.bind(this)
        this.shifting = this.shifting.bind(this)
        this.scroll = this.scroll.bind(this)
        this.subArray = this.subArray.bind(this)
    }

    click (event) {
        clicked = true
    }

    decelerate (movement) {
        console.log(movement, 'hi')
        move += movement
        this.setState({decelerate: 0})
        this.shifting()
    }

    unclick (event) {
        console.log('hi')
        clicked = false
        let movement = this.state.move
        const decelerate = this.decelerate
        decelerate(movement)
        const timer = setInterval(() => {
            decelerate(movement)
            movement *= (2/3) 
        }, 50)
        console.log(timer)
        setTimeout(() => clearInterval(timer), 1000)
        this.setState({move: 0})
    }

    shifting () {
        const shift = this.state.shift
        if (move < -199){
            move = 0
            if (shift === this.props.games.length - 1){
                this.setState({shift: 0})
            }
            else{
                this.setState({shift: shift + 1})
            }
        }
        if (move > 199){
            move = 0
            if (shift === 0){
                this.setState({shift: this.props.games.length - 1})
            }
            else{
                this.setState({shift: shift - 1})
            }
        }
    }

    scroll (event) {
        if (clicked){
            event.preventDefault()
            move += event.movementX
            this.shifting()
            if (move !== 0){
                this.setState({move})
            }
        }
    }

    subArray = () => {
        let content = []
        let shift = this.state.shift
        let array = this.props.games
        for (let i = 0; i < 5; i++){
            let fixedShift = 0
            if (i + shift > array.length - 1){
                fixedShift = - array.length
            }
            else if (i + shift < 0){
                fixedShift = array.length - 1
            }
            let num = i + shift + fixedShift
            content.push(<div key={i} style={{"translate": move + "px"}}>
                    <img src={array[num].image} width="200" height="200"></img>
                    <div>{array[num].title}</div>
                    <div>{array[num].genre}</div>
                    <div>{array[num].players}</div>
                </div>)
        }
        return content
    }

    render(){
        if (this.props.games.length > 0){
            return (<div className='waterwheel' onMouseMove={this.scroll} onMouseDown={this.click} onMouseUp={this.unclick} onMouseLeave={this.unclick}>
                {this.subArray()}
            </div>)
        }
        return <div></div>
    }
}

export default Slider