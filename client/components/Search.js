import React, {useEffect, useState} from 'react';
import axios from 'axios'

import Filter from './Filter'
import Slider from './Slider'
import Info from './Info'

const Search = () => {
    const [games, setGames] = useState([])

    useEffect( () => {
        getGames()
    }, [])

    const getGames = async () => {
        const data = (await axios.get('api/route')).data
        setGames(data)
    }

    console.log(games)

    return <div>
                <Filter />
                <Slider games={games}/>
                <Info />
           </div>
}

export default Search