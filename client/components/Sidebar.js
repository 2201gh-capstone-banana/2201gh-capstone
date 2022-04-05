import React, { useState, useContext } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons'
import { WordleAppContext } from './WordleApp'
import LeaderBoard from './LeaderBoard'
import ContactForm from './ContactForm'
import Sheet from './Sheet'
import CheatSheet from './CheatSheet'
import Instruction from './Instruction'

function Sidebar() {
	const [sidebar, setSidebar] = useState(false)
	const [cheatsheetOpen, setCheatsheetOpen] = useState(false)
	const [currentLetter, setCurrentLetter] = useState(null)
	const showSidebar = () => setSidebar(!sidebar)
	// const { winningState, setWinningState } = useContext(WordleAppContext)

	return (
		<>
			<IconContext.Provider value={{ color: '#fff' }}>
				<div className="sidebar">
					{/* <Link to="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} color="black" />
					</Link> */}
					<div></div>
					<h1 className="sidebar__header">Wordle</h1>
					<div className="left__bar">
						<LeaderBoard />
						<ContactForm />
						<Instruction />
						{/* <div>
							<AiIcons.AiOutlineCalendar
								className="openModalBtn"
								color="black"
								onClick={() => {
									setCheatsheetOpen(!cheatsheetOpen)
								}}
							/>

							{cheatsheetOpen ? (
								<CheatSheet
									cheatsheetOpen={[cheatsheetOpen, setCheatsheetOpen]}
									currentLetter={[currentLetter, setCurrentLetter]}
								/>
							) : null}
						</div> */}
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
