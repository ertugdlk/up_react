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
    

    const disableButton = (index) =>{
      console.log(maps[index])
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

        GameMaps()
      }, [])

  return (
    <>
    <div className="map-room-window">
    <div className='CloseButton1'>
            {' '}
            <ClearIcon
              fontSize='large'
              onClick={props.onClose}
            ></ClearIcon>{' '}
          </div>
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
  );
}

export default MapSelection;
