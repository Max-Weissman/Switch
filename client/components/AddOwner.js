import React, {useState} from 'react';
import axios from 'axios'

import TextBox from './Textbox'

const AddGame = () => {
    const [info, setInfo] = useState("Type in a new Owner")

    return <div className='scraper'>
                 <div>{info}</div>
                 <div className='filter'>
                    <TextBox />
                    <button onClick={async () => { //Add new owner and them to all the games as a potential owner
                        try{
                            let space = false
                            const search = document.getElementsByClassName("search")[1].value
                            setInfo("Loading")
                            console.log(search)
                            await axios.post('/api/route/add/owner', {name: search})
                            console.log('Working')
                            setInfo('Added' + search)
                            }
                            catch (err){
                            console.log("ERROR")
                            setInfo({players: "UH OH"})
                            }
                    }}>Add Owner</button>
                 </div>  
           </div>
}

export default AddGame