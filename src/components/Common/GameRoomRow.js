import { Table } from '@material-ui/core'
import React, {useState} from 'react'
import '../css/GameRoomRow.css';
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
                <div className='GameRowContainer'>
                    <div className='GRHeaderColumn' >
                        <td>
                        Room
                        </td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Name}CSGO</td>
                    </div>
                    <div className='GRHeaderColumn' >

                    <td>{props.data.Time}13.05</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Type}1v1</td>

                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Host}Phybarin</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Map}Dust2</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Fee}2</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.Reward}4</td>
                    </div>
                </div>
        )
}

export default GameRoomRow
