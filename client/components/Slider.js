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
        this.owners = this.owners.bind(this)
        this.checkingOwn = this.checkingOwn.bind(this)
        this.checkingComplete = this.checkingComplete.bind(this)
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
        event.preventDefault()
        if (clicked){
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
            if (i === 3){
                if (this.state.info.title !== array[num].title){
                    this.setState({info: array[num]})
                }
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

    owners = () => {
        if (this.state.info){
            let info = this.state.info
            let checks = []
            let owners = this.props.owners
            checks.push(<div key={0} className="user">
                            <div className="own checked" >Owners</div>
                            <div className="own checked" >Completed</div>
                        </div>)
            for (let i = 0; i < owners.length; i++){
                let owner = owners[i]
                let own = "unchecked"
                let complete = "unchecked"
                if (info[owner.name + "Own"]){
                    own = "checked"
                }
                if (info[owner.name + "Complete"]){
                    complete = "checked"
                }
                checks.push(<div key={i + 1} className="user">
                                <div className={`own ${own}`} onClick={() => this.checkingOwn(info, owner.name)}>{owner.name}</div>
                                <div className={`complete ${complete}`} onClick={() => this.checkingComplete(info, owner.name)}>{owner.name}</div>
                            </div>)
            }
            return checks
        }
        return <div></div>
    }

    checkingOwn(info, owner){
        this.props.checkOwn(info, owner)
        this.setState({info: {...info, [owner + "Own"]: !info[owner + "Own"]}})
    }

    checkingComplete(info, owner){
        this.props.checkComplete(info, owner)
        this.setState({info: {...info, [owner + "Complete"]: !info[owner + "Complete"]}})
    }

    render(){
        const info = this.state.info
        if (this.props.games.length > 0){
            return (
            <div className="slider">
                <div className='waterwheel' onMouseMove={this.scroll} onMouseDown={this.click} onMouseUp={this.unclick} onMouseLeave={this.unclick}>
                    {this.subArray()}
                </div>
                <div className="gameName">{info.title}</div>
                <div className="checks">{this.owners()}</div>
            </div>)
        }
        return <div></div>
    }
}

export default Slider