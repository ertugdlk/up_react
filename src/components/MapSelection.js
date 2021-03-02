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
    const [turn,setTurn] = useState(false)

    console.log(props)

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

      useEffect( async () => {
        
        props.socket.on('nextTurn', async ({bannedMap, team}) => {
          //buraya sıra mantığı gelecek
          //önce team 1 için banlama fonksiyonu aktif olacak. daha sonra filtered maps componentinin lengthi birse team 2 banlayacak.

          if(turn===false){
              //burada team 1 için disable fonksiyonunu aktif hale getir.
              if(filteredMaps.length===0 && props.host===team1FirstIndex){
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
              }//ikinci takım için disabled mapleri göster
              else{
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
          //burada da filtered maps için 
          if(filteredMaps.length==1){
            setTurn(true)
          }

          if(turn===true){
            if(team2FirstIndex != ""){
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

          const filteredItem = maps.filter(map=>map===maps[bannedMap])

          //check last map or not
          if(filteredItem.length == 1){

            const url = 'rcon/setupmatch'
            const response = await axios.post(
              url,
              { host: props.host },
              { withCredentials: true }
            )

            setGameInformation(response.data)
            const joinsrc = 'steam://connect/' + gameInformation
            return(
            <div>
              <span>{gameInformation}</span>
              <a href={joinsrc} class="btn btn-primary">
                {" "}
                Join the Game
              </a>
          </div>
          )
          }
          setFilteredMaps(filteredItem)
          setMaps(maps.splice(bannedMap,1))
        })
      })

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
