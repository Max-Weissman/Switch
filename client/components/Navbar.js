import React from "react"
import { Link } from "react-router-dom"

const Navbar = ({page}) => {
    
    let cat = ""
    let add = ""

    if (page === "add"){
        add = "selected"
    }
    else {
        cat = "selected"
    }

    return <nav className="navbar">
                <div className="title">Switcholouge</div>
                <Link className={cat} to="/">Catalogue</Link>
                <Link className={add} to="/Add">Add Games</Link>
            </nav>
}

export default Navbar