import React, {useState} from 'react';
import axios from 'axios'

import Filter from './Filter'

const Add = () => {
    const [info, setInfo] = useState({})

    return <div>
                <Filter />
                <button className='add-screenshot' onClick={async () => {
                    try{
                        const search = document.getElementsByClassName("search")
                        setInfo({players: "Loading"})
                        console.log(search[0].value)
                        const res = await axios.get('/api/route/add/' + search[0].value)
                        console.log(res.data)
                        setInfo(res.data)
                        }
                        catch (err){
                        console.log("ERROR")
                        setInfo({players: "Not a game"})
                        }
                }}>Add</button>
                <img src={info.image}></img>
                <div>{info.genre}</div>
                <div>{info.players}</div>
           </div>
}

export default Add