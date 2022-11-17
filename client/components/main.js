import React from 'react';
import { Route, Routes } from "react-router-dom";

import Search from './Search'
import Add from './Add'
import Adds from './Adds'

const Main = (props) => {
    let history = props.history

    return <div>
                <Routes>
                    <Route path='/' element={<Search history={history}/>} />
                    <Route path='/Add' element={<Add history={history}/>} />
                    <Route path='/Adds' element={<Adds history={history}/>} />
                </Routes>
           </div>
}

export default Main