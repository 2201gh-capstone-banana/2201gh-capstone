import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const WinningPage = () => {
    // const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className='hero-container'>
            <h1>Congratulations! Play again?</h1>
            <Link to="/wordle">
                <button className="header__link" >New Game</button>
            </Link>
            <Link to="/learning">
                <button className="header__link" >Practice</button>
            </Link>
        </div>
    )
}

export default WinningPage
