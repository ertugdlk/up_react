import React, { useState,useEffect } from 'react'
/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
/* -------------------------------------------------------------------------- */
import css from "../components/css/MapSelection.css"
import CenterModal from './UI/CenterModal'
import { set } from 'js-cookie'

function MapSelection() {

    const [maps, setMaps] = useState([])

    useEffect(() => {
        async function GameMaps() {
          const url = 'room/getmaps'
          const response = await axios.post(url, {gameName:"CSGO"},{ withCredentials: true })
          if (response.data) {       
            console.log(response.data)
            setMaps(response.data.maps)
          }
        }
    
        GameMaps()
      }, [])
  return (
    <>
    <div className="map-room-window">
    <div class='wrapper'>
    <div className='maps'>
              {maps.map((map) => (
                <div
                  className='map'
                >
                  <figure key={map.name}>
                    <span>{map.name}</span> {/*Buraya image gelecek*/}
                  </figure>
                </div>
              ))}
            </div>
            </div>
    </div>
    </>
  );
}

export default MapSelection;
