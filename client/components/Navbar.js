import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<div class="nav">
			<input type="checkbox" id="nav-check" />
			<div class="nav-header">
				<div class="nav-title">Be My Voice</div>
			</div>
			<div class="nav-btn">
				<label for="nav-check">
					<span></span>
					<span></span>
					<span></span>
				</label>
			</div>

			<div class="nav-links">
				<Link to="/main">Home</Link>
				<Link to="/main">Online Translator</Link>

				<a target="_blank">About</a>
				<Link to="/signin">Sign In</Link>
				<a
					href="https://github.com/2201gh-capstone-banana/2201gh-capstone"
					target="_blank">
					GitHub
				</a>
			</div>
		</div>
	)
}

export default Navbar
