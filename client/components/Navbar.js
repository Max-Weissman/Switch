import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({page}) => {
    
    let cat = ""
    let add = ""
    let adds = ""

    if (page === "add"){
        add = "selected"
    }
    else if (page === 'adds'){
        adds = "selected"
    }
    else {
        cat = "selected"
    }

    return <nav className="navbar">
                <div className="title">Switcholouge</div>
                <Link className={cat} to="/">Catalogue</Link>
                <Link className={add} to="/Add">Add A Game</Link>
                <Link className={adds} to="/Adds">Add Games</Link>
            </nav>
}

export default Navbar