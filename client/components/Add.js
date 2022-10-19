import React, {useState} from 'react';
import axios from 'axios'

import Filter from './Filter'

const Add = () => {
    const [pic, setpic] = useState("")

    return <div>
                <Filter />
                <button className='add-screenshot' onClick={async () => {
                    try{
                        const search = document.getElementsByClassName("search")
                        console.log(search[0].value)
                        const res = await axios.get('/api/route/add/' + search[0].value)
                        console.log(res.data)
                        setpic(res.data)
                        }
                        catch (err){
                        console.log(err)
                        }
                }}>Add</button>
                <img src={pic}></img>
           </div>
}

export default Add