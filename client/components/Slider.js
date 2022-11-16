import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import SliderInfo from './SliderInfo'

let move = 0
let movement = 0
let shift = 0
let clicked = false

const Slider = (props) => {
    const [info, setInfo] = useState(-1)
    const [content, setContent] = useState([])

    useEffect( () => {
        subArray()
    },[props.games])

    const click = (event) => {
        clicked = true
    }

    const decelerate = (moving) => {
        move += moving
        subArray()
    }

    const unclick = (event) => {
        clicked = false
        let moving = movement //After unclicking slows down over 1 second using the decelerate function 
        const timer = setInterval(() => {
            decelerate(moving)
            moving *= (2/3) 
        }, 16)
        setTimeout(() => clearInterval(timer), 1000)
        movement = 0
    }

    const shifting = () => { //moves array if pulled by user or decelerating
        if (move < -99){
            move = 99
            if (shift === props.games.length - 1){
                shift = 0
            }
            else{
                shift = shift + 1
            }
        }
        if (move > 99){
            move = -99
            if (shift === 0){
                shift = props.games.length - 1
            }
            else{
                shift = shift - 1
            }
        }
    }

    const scroll = (event) => { //Controlled movement by user
        event.preventDefault()
        if (clicked){
            move += event.movementX
            subArray()
            if (move !== 0){
                movement = event.movementX
            }
            
        }
    }

    const subArray = () => { //Turns the array of games into a cycle that loops on itself
        shifting()
        let content = []
        let array = props.games
        let fullness = props.games.length - 10
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
                if (info.title !== array[num].title){
                    setInfo(num)
                }
            }
            content.push(<div key={i} style={{"translate": move + "px"}} className={center}>
                    <img src={array[num].image} className={"pic"}></img>
                    <div>{array[num].title}</div>
                    <div>{array[num].genre}</div>
                    <div>{array[num].players}</div>
                </div>)
        }
        setContent(content)
    }

    const shiftOne = (moving) => { //After unclicking slows down over 1 second using the decelerate function 
        const timer = setInterval(() => {
            decelerate(moving)
            moving *= (2/3) 
        }, 16)
        setTimeout(() => clearInterval(timer), 1000)
        movement = 0
    }

    // const handlers = useSwipeable({
    //     onSwiped: (eventData) => console.log("User Swiped!", eventData)
    //   });


    return (
    <div className="info">
        <div className="arrows">
            <div onClick={() => shiftOne(-70)} className="arrow">&#8592;</div>
            <div className='waterwheel' onMouseMove={scroll} onMouseDown={click} onMouseUp={unclick} onMouseLeave={unclick}>
                {content}
            </div>
            <div onClick={() => shiftOne(70)} className="arrow">&#8594;</div>
        </div>
        <SliderInfo owners={props.owners} checkOwn={props.checkOwn} checkComplete={props.checkComplete} game={props.games[info]} info={info}/>
    </div>)
}

export default Slider