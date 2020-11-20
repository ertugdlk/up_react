import React, {useState} from 'react'
import '../css/GameRoomRow.css';
function GameRoomRow(props){
    //const [gameDetail, setGameDetail] = useState({})
    return(
                <div className='GameRowContainer'>
                    <div className='GRHeaderColumn' >
                        <td>
                        {props.data.room}
                        </td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td> {props.data.name}</td>
                    </div>
                    <div className='GRHeaderColumn' >

                    <td>{props.data.time}</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.type}</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.host}</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.map}</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.fee}</td>
                    </div>
                    <div className='GRHeaderColumn' >
                    <td>{props.data.fee * 2}</td>
                    </div>
                    <button className='GameRowButton'> Join Game</button>
                </div>
        )
}

export default GameRoomRow
