import React from 'react';
import axios from 'axios'

import Filter from './Filter'

const Add = () => {

    return <div>
                <Filter />
                <button className='add-screenshot' onClick={async () => {
                    try{
                        const search = document.getElementsByClassName("search")
                        console.log(search[0].value)
                        const res = await axios.get('/api/route/add/' + search[0].value)
                        console.log('hi')
                        }
                        catch (err){
                        console.log(err)
                        }
                }}>Add</button>
           </div>
}

export default Add