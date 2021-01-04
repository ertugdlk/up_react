import React, { useState } from "react"
import "../css/GameRoomRow.css"
import { Table, Button } from "semantic-ui-react"
import Room from "../Room"

function GameRoomRow(props) {
  //const [gameDetail, setGameDetail] = useState({})
  const [userRoom, setRoom] = useState(false)
  const [selectedHost, setSelectedHost] = useState("")

  const handleRoom = (host) => {
    setRoom(true)
    setSelectedHost(host)
  }

  const closeRoom = () => {
    setRoom(false)
  }

  const listRooms = () => {
    if (props.data === []) {
      return (
        <Table.Row>
          <Table.Cell>No Game</Table.Cell>
        </Table.Row>
      )
    } else {
      return props.data.map((dat) => (
        <Table.Row>
          {/* <Table.Cell>{dat.room}</Table.Cell> */}
          <Table.Cell>{dat.host}</Table.Cell>
          <Table.Cell>
            {dat.userCount}/{dat.type.charAt(0) * 2}
            {/* CS GO VE PUBG İF EKLE */}
          </Table.Cell>
          <Table.Cell>{dat.name}</Table.Cell>
          <Table.Cell>{dat.createdAt}</Table.Cell>
          <Table.Cell>{dat.map}</Table.Cell>
          <Table.Cell>{dat.type}</Table.Cell>
          <Table.Cell>{dat.fee}</Table.Cell>
          <Table.Cell>{dat.fee * 2}</Table.Cell>
          <Table.Cell>
            <Button color="green" onClick={() => props.onJoin(dat.host)}>
              Join game
            </Button>
          </Table.Cell>
        </Table.Row>
      ))
    }
  }

  return (
    <div className="Games">
      {userRoom ? (
        <Room handleCloseRoom={closeRoom} host={selectedHost}></Room>
      ) : null}
      <Table padded inverted selectable>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>Room</Table.HeaderCell> */}
            <Table.HeaderCell>Host</Table.HeaderCell>
            <Table.HeaderCell>Users</Table.HeaderCell>
            <Table.HeaderCell>Game</Table.HeaderCell>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Map</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Fee</Table.HeaderCell>
            <Table.HeaderCell>Reward</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{listRooms()}</Table.Body>
      </Table>
    </div>
  )
}

export default GameRoomRow
