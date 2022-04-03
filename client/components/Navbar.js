import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faAlignJustify, faX } from '@fortawesome/free-solid-svg-icons'
import { signout } from '../store/auth'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'

function Navbar(props) {
	const [click, setClick] = useState(false)
	const handleClick = () => setClick(!click)
	const closeMobileMenu = () => setClick(false)
	const closeAndSignOut = () => {
		setClick(false)
		props.signout()
	}
	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<div>
						<Link to="/" className="navbar-logo">
							<img
								src="logo.svg"
								alt="website logo"
								className="navbar__logo"
							/>{' '}
							&nbsp; BE MY VOICE
						</Link>
					</div>
					<div>
						<div className="menu-icon" onClick={handleClick}>
							<FontAwesomeIcon icon={click ? faX : faAlignJustify} />
						</div>
						<ul className={click ? 'nav-menu active' : 'nav-menu'}>
							{window.location.pathname === '/wordle' && <Sidebar />}
							<li className="no-bullets">
								<Link
									to="/"
									className="nav-links"
									onClick={closeMobileMenu}>
									Home
								</Link>
							</li>

							<li className="no-bullets">
								<Link
									to="/learning"
									className="nav-links"
									onClick={closeMobileMenu}>
									Learning
								</Link>
							</li>

							<li className="no-bullets">
								<Link
									to="/about"
									className="nav-links"
									onClick={closeMobileMenu}>
									About
								</Link>
							</li>

							<li className="no-bullets">
								<Link
									to="/wordle"
									className="nav-links"
									onClick={closeMobileMenu}>
									Game
								</Link>
							</li>

							{/* Show the signout only if the user is not logged in */}
							{!props.correctUser ? (
								<li className="no-bullets">
									<Link
										to="/signin"
										className="nav-links"
										onClick={closeMobileMenu}>
										Sign In
									</Link>
								</li>
							) : null}

							{/* Show the signout only if user is logged in. */}
							{props.correctUser ? (
								<li className="no-bullets">
									<Link
										to="/"
										className="nav-links"
										onClick={closeAndSignOut}>
										Sign Out
									</Link>
								</li>
							) : null}
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

const mapStateToProps = state => {
	return {
		/* This is to check if the user is signed in. */
		correctUser: state.auth.correctUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		signout: () => dispatch(signout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
