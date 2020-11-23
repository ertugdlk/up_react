import React, {useState}  from  'react'
import css  from './css/CreateGame.css'
import ClearIcon from '@material-ui/icons/Clear';

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

    const onMapChange = (e) => {
        setData({...data, map: e.target.value } )
    }
    const onTypeChange = (e) => {
        setData({...data, type: e.target.value } )

    }
    const onFeeChange = (e) => {
        setData({...data, fee: e.target.value } )
    }

    return(
        <> 
            <div className=  'CreateWindow'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
                <label>CreateGame</label>
                <div class='CreateRow'>
                <label>Map</label>
                    <select onChange={ (e) => onMapChange(e)}>
                        <option value="0">Dust2</option>
                        <option value="1">Mirrage</option>
                    </select>
                </div>
                <div class='CreateRow'>
                <label>Type</label>
                <select onChange={ (e) => onTypeChange(e)}>
                        <option value="0">1v1</option>
                        <option value="1">2v2</option>
                    </select>
                </div>
                <div className='CreateRow'>
                <label>Fee</label>
                    <input onChange={(e) => onFeeChange(e)}></input>
                </div>
                <button onClick= { () => props.onCreate(data)}>Create Game</button>
            </div>
        </>
    )
}

export default CreateGame