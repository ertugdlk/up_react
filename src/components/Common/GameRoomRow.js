import React, { useState } from 'react';
import '../css/GameRoomRow.css';
import { Table, Button } from 'semantic-ui-react';
import GameRoom from '../Room'
function GameRoomRow(props) {
  //const [gameDetail, setGameDetail] = useState({})
  const [userRoom,setRoom] = useState(false);
  const [selectedHost , setSelectedHost] = useState('')

  const handleRoom = (host) => {
    setRoom(true);
    setSelectedHost(host)
  };

  const listRooms = () => {
    return props.data.map((dat) => (
      <Table.Row>
        <Table.Cell>{dat.room}</Table.Cell>
        <Table.Cell>{dat.name}</Table.Cell>
        <Table.Cell>{dat.createdAt}</Table.Cell>
        <Table.Cell>{dat.type}</Table.Cell>
        <Table.Cell>{dat.host}</Table.Cell>
        <Table.Cell>{dat.map}</Table.Cell>
        <Table.Cell>{dat.fee}</Table.Cell>
        <Table.Cell>{dat.fee * 2}</Table.Cell>
        <Table.Cell>
          <Button color='green' onClick={handleRoom(dat.host)}>Join game</Button>
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <div className='Games'>
      {userRoom ? <GameRoom host={selectedHost}></GameRoom> : null}
      <Table padded inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Room</Table.HeaderCell>
            <Table.HeaderCell>Game</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Host</Table.HeaderCell>
            <Table.HeaderCell>Map</Table.HeaderCell>
            <Table.HeaderCell>Fee</Table.HeaderCell>
            <Table.HeaderCell>Reward</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{listRooms()}</Table.Body>
      </Table>
    </div>
  );
}

export default GameRoomRow;
