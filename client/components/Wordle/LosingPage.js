import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const LosingPage = () => {
    // const [modalOpen, setModalOpen] = useState(false)
    return (
        <div>
            <h1>Sorry! Better Luck next time.</h1>
            <Link to="/wordle">
                <button className="header__link" >New Game</button>
            </Link>
            <Link to="/learning">
                <button className="header__link">Practice</button>
            </Link>
        </div>
    )
}

export default LosingPage