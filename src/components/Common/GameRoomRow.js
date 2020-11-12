import { Table } from '@material-ui/core'
import React, {useState} from 'react'
import Css from './GameRoomRow.css'
import Logo from './miniklogo.png'
function GameRoomRow(props){
    const [gameDetail, setGameDetail] = useState({})
        /*
        useEffect(() => {
            getData()
        }, [])

        const getData = async () => {
            let url = `URL${id}`
            const response = await axios.get(URL) 
            setGames(response.data)
        }

        const JoinRoom = (id) => {
            //
            })
        }
        */

    return(
                <tr className='GameRowContainer'>
                    <img src ={Logo} className='minikLogo'></img>
                    <td>{gameDetail.GameName}CSGO</td>
                    <td>{gameDetail.Time}13.05</td>
                    <td>{gameDetail.Mode}1v1</td>
                    <td>{gameDetail.Host}Phybarin</td>
                    <td>{gameDetail.map}Dust2</td>
                    <td>{gameDetail.fee}2</td>
                    <td>{gameDetail.reward}4</td>
                    <td className='operation'>
                        <button className='GameRowButton'>Join Game</button>
                    </td>
                </tr>
        )
}

export default GameRoomRow
