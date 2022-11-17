import React from 'react';

import Navbar from './Navbar'
import AddGames from './AddGames'

const Adds = ({history}) => {
    history.replace('/')
    return <div className='content'>
                <Navbar page="adds"/>
                <AddGames />
           </div>
}

export default Adds