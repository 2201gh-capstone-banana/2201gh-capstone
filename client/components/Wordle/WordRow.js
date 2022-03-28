import React from 'react'
import LetterCell from './LetterCell'

function WordRow({ rowId, cells }) {
  // const { board, translation } = useContext(WordleAppContext)
  return (
    <div className='row' key={rowId}>
      {cells.map((cell, index) => {
        return (
          <LetterCell key={index} letter={cell} index={index} rowId={rowId} />
        )
      })}
    </div>
  )
}

export default WordRow
