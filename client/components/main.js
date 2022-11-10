import React from 'react';
import { Route, Routes } from "react-router-dom";

import Navbar from './Navbar'
import Search from './Search'
import Add from './Add'

const Main = (props) => {
    let history = props.history
    return <div>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Search history={history}/>} />
                    <Route path='/Add' element={<Add history={history}/>} />
                </Routes>
           </div>
}

export default Main