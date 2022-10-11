import React from 'react';
import { Route, Routes } from "react-router-dom";

import Search from './Search'
import Add from './Add'

const Main = () => {
    return <div>

                <Routes>
                    <Route path='/' element={<Search />} />
                    <Route path='/Add' element={<Add />} />
                </Routes>
           </div>
}

export default Main