import React, {useState, useEffect}  from  'react'
import css  from './css/CreateGame.css'
import ClearIcon from '@material-ui/icons/Clear';
import {createGlobalStyle} from 'styled-components'
const _ = require('lodash')

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`


function CreateGame(props)
{
    const[data , setData] = useState({
        name:'CSGO',
        map:'Dust2',
        type:'1v1',
        fee: 1,
        room: 1,
        host: '',
        time: new Date().toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute:'2-digit'
          })
    })

    const [selectedGame, setSelectedGame] = useState({
            name : "",
            appID : "",
            img : "",
            maps : [
                "" 
            ],
            types : [ 
                ""
            ]
    })

    useState(() => {
        setSelectedGame(props.games[0])
    })

    const onMapChange = (e) => {
        setData({...data, map: e.target.value } )
    }
    const onTypeChange = (e) => {
        setData({...data, type: e.target.value } )

    }
    const onFeeChange = (e) => {
        setData({...data, fee: e.target.value } )
    }
    
    const onGameChange = (e) => {
        const selGame = _.find(props.games, function(game){
            const selname = _.get(e.target, e.target.value)
            return game.name == selname.label
        })
        setSelectedGame(selGame)
    }

    return(
        <> <GlobalStyle></GlobalStyle>
            <div className=  'CreateWindow'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
            <header className="header">Create Game</header>
                <div className='CreateRow'>
                    <label className="labels">Game Selection</label>
                    <select className="create-select" onChange= { (e) => onGameChange(e)}> 
                        {props.games.map( (game, index) =>
                            <option className="create-option" value= {index} > {game.name}</option>)
                        }
                    </select>
                </div>
                <div className='CreateRow'>
                <label className="labels">Map</label>
                    <select className="create-select" onChange={ (e) => onMapChange(e)}>
                        {selectedGame.maps.map( (map, index )=> 
                            <option className="create-option" value={index}> {map}</option>
                            )}
                    </select>
                </div>
                <div className='CreateRow'>
                <label className="labels">Type</label>
                <select className="create-select" onChange={ (e) => onTypeChange(e)}>
                    {selectedGame.types.map( (type, index) => 
                            <option className="create-option" value={index}> {type}</option>
                            )}
                    </select>
                </div>
                <div className='CreateRow'>
                <label className="labels">Fee</label>
                    <input className="create-input" onChange={(e) => onFeeChange(e)}></input>
                </div>
                <button class="button" onClick= { () => props.onCreate(data)}>Create Game</button>
            </div>
        </>
    )
}

export default CreateGame