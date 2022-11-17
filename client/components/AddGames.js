import React, {useState, useEffect} from 'react';
import axios from 'axios'

const AddGames = () => {
    const [own, setOwn] = useState([])
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("Type in Games in this format: Game(Billy)")

    useEffect( () => {
        getOwn()
    }, [])

    const getOwn = async () => { //Initial grab from database
        const data = (await axios.get('api/route')).data
        const checks = data.owners.map(owner => {
            return {name: owner.name, own: false, complete: false}
        })
        setOwn(checks)
    }

    return <div className='scraper'>
                <div>{message}</div>
                <div>
                    <textarea className="games" type="text" value={input} onChange={evt => setInput(evt.target.value)} rows="10" cols="20" />
                </div>
                    <button onClick={async () => {
                        try{
                            let space = false
                            const search = []
                            let game = ''
                            document.getElementsByClassName("games")[0].value.split('').forEach((letter,index) => { //filter games into an array with Capitilization fixed
                                if (index === 0){
                                    game += letter.toUpperCase()
                                }
                                else if (letter === ' ' || letter.charCodeAt(0) === 10){
                                    game += letter
                                    space = true
                                }
                                else if (letter === '('){
                                    search.push(game)
                                    game = ''
                                    space = true
                                }
                                else if(letter === ')'){
                                    search.push(game)
                                    game = ''
                                }
                                else if (space){
                                    space = false
                                    game+= letter.toUpperCase()
                                }
                                else{
                                    game+= letter
                                }
                            })
                            console.log(search)
                            for (let i = 0; i < search.length; i+= 2){ //Go through each game
                                let data
                                try{
                                    const res = await axios.get('api/route/add/' + search[i]) //Find the game Data
                                    console.log(res.data)
                                    data = res.data
                                    data.title = search[i]
                                }
                                catch (err){
                                    console.log(search[i] + 'is not a game')
                                    setMessage(search[i] + 'is not a game')
                                }
                                let owners = own.map(owner => { //Set the owner of this game
                                    if (owner.name === search[i + 1]){
                                        owner.own = true
                                    }
                                    return owner
                                })
                                let info = data
                                try { //upload the game
                                    await axios.post('api/route/add', {info, owners})
                                    setMessage(`Added ${search[i]} to collection`)
                                }
                                catch (err){
                                    console.log("ERROR")
                                    setMessage(search[i] + "Not Uploaded")
                                }
                                own.forEach(owner => { //reset the owners
                                    if (owner.name === search[i + 1]){
                                        owner.own = false
                                    }
                                })
                            }
                        }
                        catch (err){
                            console.log("ERROR")
                            setMessage("Typo Somewhere")
                        }
                    }}>Multi-Add</button>
           </div>
}

export default AddGames