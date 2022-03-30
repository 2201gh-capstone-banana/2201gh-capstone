import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import IdleTimer from 'react-idle-timer'

/* Thunk. */
import { autoSignin, signout } from './store/auth'

/* Components. */
import LandingPage from './components/LandingPage'
import AuthForm from './components/AuthForm'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Learning from './components/Learning'
import WordleApp from './components/WordleApp'
import Idle from './components/Idle'
import About from './components/About'
import WinningPage from './components/Wordle/EndGame'
import LosingPage from './components/Wordle/LosingPage'

class Routes extends React.Component {
	constructor() {
		super()
		this.state = {
			warningTimer: 780000 /* 13 minutes...i hope */,
			isTimedOut: false
		}

		this.idelTimerRef = React.createRef(null)
		this.onIdle = this.onIdle.bind(this)
		this.onActive = this.onActive.bind(this)
	}

	componentDidMount() {
		this.props.autoSignin()
	}

	onIdle() {
		/* Changing state to display a warning. */
		this.setState({ isTimedOut: true })

		/* Wait two mintues after warning. */
		setTimeout(() => {
			/* If the user hasn't interacted after warning. */
			if (this.state.isTimedOut) {
				this.props.signout()
				// window.location.href = '/'
			}
		}, 120000) /* 2 minutes. */
	}

	onActive = () => {
		this.setState({ isTimedOut: false })
	}

	render() {
		return (
			<>

				{this.props.correctUser ? (
					<IdleTimer
						ref={this.idelTimerRef}
						timeout={this.state.warningTimer}
						crossTab={true}
						onIdle={this.onIdle}
						onActive={this.onActive}>
						{!this.state.isTimedOut ? null : <Idle />}

						<Router>
							<Navbar />

							<Switch>
								?
								<Route exact path="/" component={Home} />
								<Route exact path="/about" component={About} />
								<Route exact path="/main" component={Main} />
								<Route exact path="/signin" component={AuthForm} />
								<Route exact path="/learning" component={Learning} />
								<Route exact path="/wordle" component={WordleApp} />
								<Route exact path="/wordle/winning-page" component={WinningPage} />
								<Route exact path="/wordle/losing-page" component={LosingPage} />
							</Switch>
						</Router>
					</IdleTimer>
				) : (
					<Router>
						<Navbar />

						<Switch>
							?
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
							<Route exact path="/main" component={Main} />
							<Route exact path="/signin" component={AuthForm} />
							<Route exact path="/learning" component={Learning} />
							<Route exact path="/wordle" component={WordleApp} />
							<Route exact path="/wordle/winning-page" component={WinningPage} />
							<Route exact path="/wordle/losing-page" component={LosingPage} />
						</Switch>
					</Router>
				)}
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		correctUser: state.auth.correctUser
	}
}

const mapDispatchToProps = dispatch => {
	return {
		autoSignin: () => dispatch(autoSignin()),
		signout: () => dispatch(signout())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
