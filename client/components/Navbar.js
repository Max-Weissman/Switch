import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar">
        <Link to="/">Catalogue</Link>
        <Link to="/Add">Add Games</Link>
    </nav>
);

export default Navbar