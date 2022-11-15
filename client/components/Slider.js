import React, { Component } from "react";

import SliderInfo from './SliderInfo'

let move = 0

class Slider extends Component{
    constructor() {
        super()
        this.state = {
            clicked: false,
            move: 0,
            shift: 0,
            decelerate: 0,
            info: {title: false}
        }
        this.click = this.click.bind(this)
        this.decelerate = this.decelerate.bind(this)
        this.unclick = this.unclick.bind(this)
        this.shifting = this.shifting.bind(this)
        this.scroll = this.scroll.bind(this)
        this.subArray = this.subArray.bind(this)
        this.shift = this.shift.bind(this)
    }

    click (event) {
        this.setState({clicked: true})
    }

    decelerate (movement) {
        move += movement
        this.setState({decelerate: 0})
        this.shifting()
    }

    unclick (event) {
        this.setState({clicked:false})
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
        event.preventDefault()
        if (this.state.clicked){
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
        let fullness = this.props.games.length - 10
        let sliderLength = 10
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
            let center = ""
            if (i === 4){
                center = "highlighted"
                if (this.state.info.title !== array[num].title){
                    this.setState({info: array[num]})
                }
            }
            content.push(<div key={i} style={{"translate": move + "px"}} className={center}>
                    <img src={array[num].image} width="200" height="200"></img>
                    <div>{array[num].title}</div>
                    <div>{array[num].genre}</div>
                    <div>{array[num].players}</div>
                </div>)
        }
        return content
    }

    settingOwn = (info, owner) => {
        this.setState({info: {...info, [owner + "Own"]: !info[owner + "Own"]}})
    }
    
    settingComplete = (info, owner) => {
        this.setState({info: {...info, [owner + "Complete"]: !info[owner + "Complete"]}})
    }

    shift = (movement) => {
        const decelerate = this.decelerate
        decelerate(movement) //After unclicking slows down over 1 second using the decelerate function 
        const timer = setInterval(() => {
            decelerate(movement)
            movement *= (2/3) 
        }, 16)
        setTimeout(() => clearInterval(timer), 1000)
        this.setState({move: 0})
    }

    render(){
        if (this.props.games.length > 0){
            return (
            <div className="info">
                <div className="arrows">
                    <div onClick={() => this.shift(-55)} className="arrow">&#8592;</div>
                    <div className='waterwheel' onMouseMove={this.scroll} onMouseDown={this.click} onMouseUp={this.unclick} onMouseLeave={this.unclick}>
                        {this.subArray()}
                    </div>
                    <div onClick={() => this.shift(55)} className="arrow">&#8594;</div>
                </div>
                
                <SliderInfo owners={this.props.owners} checkOwn={this.props.checkOwn} checkComplete={this.props.checkComplete} info={this.state.info} settingOwn={this.settingOwn} settingComplete={this.settingComplete}/>
            </div>)
        }
        return <div></div>
    }
}

export default Slider