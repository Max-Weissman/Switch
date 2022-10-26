import React, {useState} from 'react';
import axios from 'axios'

import Filter from './Filter'

const Add = () => {
    const [info, setInfo] = useState({})

    return <div>
                <Filter />
                <img src={info.image}></img>
                <div>{info.genre}</div>
                <div>{info.players}</div>
                <button className='Search' onClick={async () => {
                    try{
                        let space = false
                        const search = document.getElementsByClassName("search")[0].value.split('').map((letter,index) => {
                            if (index === 0){
                                return letter.toUpperCase()
                            }
                            else if (letter === ' '){
                                space = true
                                return letter
                            }
                            else if (space){
                                space = false
                                return letter.toUpperCase()
                            }
                            else{
                                return letter
                            }
                        }).join('')
                        setInfo({players: "Loading"})
                        console.log(search)
                        const res = await axios.get('/api/route/add/' + search)
                        console.log(res.data)
                        let data = res.data
                        data.title = search
                        setInfo(data)
                        }
                        catch (err){
                        console.log("ERROR")
                        setInfo({players: "Not a game"})
                        }
                }}>Search</button>
                <button className='Add' onClick={async () => {
                    try {
                        await axios.post('api/route/add', info)
                        setInfo({players: 'Added game to collection'})
                    }
                    catch (err) {
                        console.log("ERROR")
                        setInfo({players: "Not Uploaded"})
                    }
                }}>Add</button>
           </div>
}

export default Add