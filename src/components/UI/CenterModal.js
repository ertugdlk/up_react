import React from 'react'
import './CenterModal.css'

function CenterModal(props) {
  return (
    <div class='outer'>
      <div class='middle'>
        <div class='inner'>{props.children}</div>
      </div>
    </div>
  )
}

export default CenterModal
