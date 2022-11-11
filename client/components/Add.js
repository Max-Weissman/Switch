import React from 'react';

import Navbar from './Navbar'
import AddGame from './AddGame'
import AddOwner from './AddOwner'

const Add = ({history}) => {
    history.replace('/')
    return <div className='content'>
                <Navbar page="add"/>
                <AddGame />
                <AddOwner />
           </div>
}

export default Add