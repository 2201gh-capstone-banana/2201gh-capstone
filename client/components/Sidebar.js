import React, { useState, useContext } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import { WordleAppContext } from './WordleApp'
import LeaderBoard from './LeaderBoard'
import ContactForm from './ContactForm'

import CheatSheet from './CheatSheet'
import Instruction from './Instruction'

function Sidebar() {
	const [sidebar, setSidebar] = useState(false)
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [currentLetter, setCurrentLetter] = useState(null)
	const showSidebar = () => setSidebar(!sidebar)

	return (
		<>
			<IconContext.Provider value={{ color: '#fff' }}>
				<div className="sidebar">
					<div></div>
					<h1 className="sidebar__header">Wordle</h1>
					<div className="left__bar">
						<LeaderBoard />
						<ContactForm />
						<Instruction />
					</div>
				</div>
				<nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
					<ul className="sidebar-menu-items" onClick={showSidebar}>
						<li className="sidebarbar-toggle">
							<Link to="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	)
}

export default Sidebar
