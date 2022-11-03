import React, { Component } from "react";

let move = 0
let clicked = false

class Slider extends Component{
    constructor() {
        super()
        this.state = {
            move: 0,
            shift: 0,
            decelerate: 0,
            info: {title: false}
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
        move += movement
        this.setState({decelerate: 0})
        this.shifting()
    }

    unclick (event) {
        clicked = false
        let movement = this.state.move
        const decelerate = this.decelerate
        decelerate(movement) //After unclicking slows down over 1 second using the decelerate function 
        const timer = setInterval(() => {
            decelerate(movement)
            movement *= (2/3) 
        }, 16)
        setTimeout(() => clearInterval(timer), 1000)
        this.setState({move: 0})
    }

    shifting () { //moves array if pulled by user or decelerating
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

    scroll (event) { //Controlled movement by user
        if (clicked){
            event.preventDefault()
            move += event.movementX
            this.shifting()
            if (move !== 0){
                this.setState({move})
            }
        }
    }

    subArray = () => { //Turns the array of games into a cycle that loops on itself
        let content = []
        let shift = this.state.shift
        let array = this.props.games
        let fullness = this.props.games.length - 7
        let sliderLength = 7
        if (fullness < 0){
            sliderLength += fullness
        }
        for (let i = 0; i < sliderLength; i++){
            let fixedShift = 0
            if (i + shift > array.length - 1){
                fixedShift = - array.length
            }
            else if (i + shift < 0){
                fixedShift = array.length - 1
            }
            let num = i + shift + fixedShift
            let info = <div></div>
            if (i === 3){
                if (this.state.info.title !== array[num].title)
                this.setState({info: array[num]})
            }
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
        const info = this.state.info
        if (this.props.games.length > 0){
            return (
            <div>
                <div className='waterwheel' onMouseMove={this.scroll} onMouseDown={this.click} onMouseUp={this.unclick} onMouseLeave={this.unclick}>
                    {this.subArray()}
                </div>
                <div>{info.title}</div>
            </div>)
        }
        return <div></div>
    }
}

export default Slider