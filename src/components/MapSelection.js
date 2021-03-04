import React, { useState,useEffect,useRef } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
/* -------------------------------------------------------------------------- */
import css from "../components/css/MapSelection.css"
import CenterModal from './UI/CenterModal'
import { set } from 'js-cookie'

function MapSelection(props) {

    const [maps, setMaps] = useState([])
    const [filteredMaps,setFilteredMaps] = useState([])
    const [team1FirstIndex,setTeam1FirstIndex] = useState("")
    const [team2FirstIndex,setTeam2FirstIndex] = useState("")
    const [gameInformation,setGameInformation] = useState([])

    //IMPROVEMENT İLERİSİNN İŞİ 
    //banlanan mapler localstorage ta tutlup kontrol edilebilir. oda da başladığında local storage da roomid si ile güncel mapler tutulabilir

    const disableButton = (index) =>{
      // socket io emit ban
      const bannedMap = index;
      props.socket.emit("mapselection", {host:props.host , bannedMap, team: 1})

     }
    
    useEffect(() => {
        async function GameMaps() {
          const url = 'room/getmaps'
          const response = await axios.post(url, {gameName:"CSGO"},{ withCredentials: true })
          if (response.data) {       
            setMaps(response.data.maps)
          }
        }

      setTeam1FirstIndex(props.team1[0].nickname)
      setTeam2FirstIndex(props.team2[0].nickname)

        GameMaps()
      }, [])

      useEffect(() => {
        let filteredItems = []
        const url = 'steam://connect/' + gameInformation
        props.socket.on('nextTurn', ({bannedMap, team}) => {
          filteredItems = filteredItems.concat(maps[bannedMap])
         
          /*const filteredItem = maps.filter(banMap=>{
            console.log("banned map", bannedMap)
            console.log("remaining maps", maps.splice(bannedMap,1))
            return banMap=== maps[bannedMap]})
            console.log("filtered item",filteredItem)*/
          if(filteredItems.length == 1){
            return(
            <div>
              <span>{gameInformation}</span>
              <a href={url} class="btn btn-primary">
                {" "}
                Join the Game
              </a>
          </div>
          )
          }
          setFilteredMaps(filteredItems)
          setMaps(maps.splice(bannedMap,1))
        })
      })

      useEffect(async () => {
        
          const url = 'rcon/setupmatch'
          const response = await axios.post(
            url,
            { host: props.host },
            { withCredentials: true }
          )
          setGameInformation(response.data)
        }
      )

      if(team1FirstIndex != "" || team2FirstIndex != "" ){
        return(
          <>
          <div className="map-room-window">
    <div class='wrapper'>
    <div className='maps'>
              {maps.map((map,index) => (
                <li className="map-list">
                <button
                  className='map' onClick={()=> disableButton(index)}>
                    <span>{maps[index]}</span> {/*Buraya image gelecek*/}
                </button>
                </li>
              ))}
              </div>
            </div>
        </div>
          </>
        )
      }else{
        return(
        <>
         <div className="map-room-window">
    <div class='wrapper'>
    <div className='maps'>
             {filteredMaps.map((map) => (
               <li className="map-list">
                <button disabled className='disabled-map'>
                    <span>Deneme 2</span> {/*Buraya image gelecek*/}
                </button>
                </li>
              ))}
            </div>
            </div>
    </div>
        </>
        )
      }
}

export default MapSelection;
