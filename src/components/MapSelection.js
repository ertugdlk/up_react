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



    const disableButton = (index) =>{
      const filteredItem = maps.filter(map=>map===maps[index])
      setFilteredMaps(filteredItem)
      setMaps(maps.splice(index,1))
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
                    <span>Deneme</span> {/*Buraya image gelecek*/}
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
