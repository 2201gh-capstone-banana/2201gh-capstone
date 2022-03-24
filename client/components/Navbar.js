import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faAlignJustify, faX } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)
	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link to="/" className="navbar-logo">
						BE MY VOICE
						<FontAwesomeIcon icon={faArrowUpAZ} />
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<FontAwesomeIcon icon={click ? faX : faAlignJustify} />
					</div>
					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						
						<li>
							<Link
								to="/home"
								className="nav-links"
								onClick={closeMobileMenu}>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/learning"
								className="nav-links"
								onClick={closeMobileMenu}>
								Learning
							</Link>
						</li>
						<li>
							<Link
								to="/game"
								className="nav-links"
								onClick={closeMobileMenu}>
								Game
							</Link>
						</li>
						<li>
							<Link
								to="/signin"
								className="nav-links"
								onClick={closeMobileMenu}>
								Sign In
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export default Navbar
