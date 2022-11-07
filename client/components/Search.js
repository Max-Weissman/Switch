import React, {useEffect, useState} from 'react';
import axios from 'axios'

import TextBox from './Textbox'
import Slider from './Slider'
import Info from './Info'

const Search = () => {
    const [games, setGames] = useState([])
    const [filteredGames, setFilteredGames] = useState([])
    const [owners, setOwners] = useState([])

    useEffect( () => {
        getGames()
    }, [])

    const getGames = async () => { //Initial grab from database
        const data = (await axios.get('api/route')).data
        setGames(data.games)
        setFilteredGames(data.games)
        setOwners(data.owners)
    }

    const checkOwn = async (info, owner) => {
        const data = (await axios.put('api/route/own', {info, owner}))
    }

    const checkComplete = async (info, owner) => {
        const data = (await axios.put('api/route/complete', {info, owner}))
    }

    const filterGames = (search) => {
        const entry = search.toUpperCase() //Text input from user
        const filter = document.getElementById("categories").value
        const filter2 = document.getElementById("players").value
        const filteredOnce = games.filter(game => {
            if (filter === 'title'){
                let target = game.title.toUpperCase()
                if (target.includes(entry)){
                    return true
                }
                else{
                    return false
                }
            }
            else if (filter === 'genre'){ //Genre is stored as one string, must seperate individual categories
                let target = game.genre.toUpperCase().split(' ')
                for (let i = 0; i < target.length; i++){
                    if (target[i].includes(entry)){
                        return true
                    }
                    return false
                }
            }
            else if (filter === 'owner'){ //owner and completed stored as NAMEowner and COMPLETEDowner
                for (let keys in game){
                    if (keys.toUpperCase().includes(entry)){
                        if (game[keys] && typeof game[keys] === 'boolean'){
                            return true
                        }
                    }
                }
                return false
            }
            else {
                for (let keys in game){
                    if (keys.toUpperCase().includes(entry)){
                        if (game[keys] && typeof game[keys] === 'boolean'){
                            return true
                        }
                    }
                }
                return false
            }
        })
        const filtered = filteredOnce.filter(game => { //A game can be both categories, is inclusive
            let players = game.players.toUpperCase().split(' ')
            if (filter2 === 'multi'){
                for (let i = 0; i < players.length; i++){
                    if (players[i].includes('MULTI')){
                        return true
                    }
                }
            }
            else if (filter2 === 'single'){
                for (let i = 0; i < players.length; i++){
                    if (players[i].includes('SINGLE')){
                        return true
                    }
                }
            }
            else{ //if no filter for this section
                return true
            }
        })
        setFilteredGames(filtered)
    }

    console.log(owners)

    return <div>
                <label htmlFor="categories">Category:</label>
                <select name="categories" id="categories">
                    <option value="title">Title</option>
                    <option value="genre">Genre</option>
                    <option value="owner">Owner</option>
                    <option value="completed">Completed</option>
                </select>
                <label htmlFor="players">Players:</label>
                <select name="players" id="players">
                    <option value="any">Any</option>
                    <option value="single">Single Player</option>
                    <option value="multi">Multiplayer</option>
                </select>
                <input type="text" onChange={evt => filterGames(evt.target.value)}
                />
                <Slider games={filteredGames} owners={owners} checkOwn={checkOwn} checkComplete={checkComplete}/>
                <Info />
           </div>
}

export default Search