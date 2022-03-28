import React from 'react'
import LetterCell from './LetterCell'

function WordRow({ rowIdx, row }) {
  // const { board, translation } = useContext(WordleAppContext)
  // let wordArr = word.toUpperCase().split('');
  return (
    <div className='row' key={rowIdx}>
      {row.map((letter, index) => {
        return (
          <LetterCell key={index} letter={letter} index={index} />
        )
      })}
    </div>
  )
}

export default WordRow
