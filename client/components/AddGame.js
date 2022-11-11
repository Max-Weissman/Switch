import React, {useState, useEffect} from 'react';
import axios from 'axios'

import TextBox from './Textbox'

const AddGame = () => {
    const [info, setInfo] = useState({players: 'Type in the name of a game'})
    const [owners, setOwners] = useState([])

    useEffect( () => {
        getOwners()
    }, [])

    const getOwners = async () => { //Initial grab from database
        const data = (await axios.get('api/route')).data
        const checks = data.owners.map(owner => {
            return {name: owner.name, own: false, complete: false}
        })
        setOwners(checks)
    }

    const checkingOwn = (own, i) => {
        let checks = [...owners]
        checks[i].own = !own
        setOwners(checks)
    }    

    const checkingComplete = (complete, i) => {
        let checks = [...owners]
        checks[i].complete = !complete
        setOwners(checks)
    }    

    return <div className='scraper'>
                <img src={info.image} className='margin'></img>
                <div>{info.genre}</div>
                <div>{info.players}</div>
                <div className='filter'>
                    <TextBox />
                    <button onClick={async () => { //Finds the info for the game if it exists on wikipedia
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
                    <button className='Add' onClick={async () => { //Add game to catalogue after info for it has been found from wikipedia
                        try {
                            await axios.post('api/route/add', {info, owners})
                            setInfo({players: 'Added game to collection'})
                        }
                        catch (err) {
                            console.log("ERROR")
                            setInfo({players: "Not Uploaded"})
                        }
                    }}>Add Game</button>
                </div>
                <div className='checks'>
                    <div key={0} className="user">
                        <div className={`own checked label`}>Owner</div>
                        <div className={`own checked label`} >Completed</div>
                    </div>
                    {owners.map((owner,i) => {
                        let own = "unchecked"
                        let complete = "unchecked"
                        if (owner.own){
                            own = "checked"
                        }
                        if (owner.complete){
                            complete = "checked"
                        }
                        return <div key={i + 1} className="user">
                            <div className={`own ${own}`} onClick={() => checkingOwn(owner.own, i)}>{owner.name}</div>
                            <div className={`complete ${complete}`} onClick={() => checkingComplete(owner.complete, i)}>{owner.name}</div>
                        </div>
                    })}
                </div>
           </div>
}

export default AddGame