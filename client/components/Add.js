import React from 'react';

import AddGame from './AddGame'
import AddOwner from './AddOwner'

const Add = ({history}) => {
    history.replace('/')
    return <div className='content'>
                <AddGame />
                <AddOwner />
           </div>
}

export default Add