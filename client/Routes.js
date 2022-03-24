import React, { useRef } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import IdleTimer from 'react-idle-timer'

/* Thunk. */
import { autoSignin } from './store/auth'

/* Components. */
import LandingPage from './components/LandingPage'
import AuthForm from './components/AuthForm'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Learning from './components/Learning'
import Idle from './components/Idle'

class Routes extends React.Component {
	constructor() {
		super()
		this.state = {
			timeout: 900000 /* 15 minutes...i hope. */,
			isTimedOut: false
		}

		this.idelTimerRef = React.createRef(null)
		this.onIdle = this.onIdle.bind(this)
		this.onAction = this.onAction.bind(this)
	}
	componentDidMount() {
		this.props.autoSignin()
	}

	onIdle() {
		this.setState({ isTimedOut: true })
	}

	onAction = () => {
		this.setState({ isTimedOut: false })
	}

	render() {
		return (
			// <Switch>
			// 	<Route exact path="/" component={LandingPage} />
			// 	{/*
			// 		For auto signin when token is in local storage.
			// 		Hide the signin page if token is valid.
			// 	*/}
			// 	<Route path="/signin">
			// 		{this.props.correctUser ? <Redirect to="/main" /> : <AuthForm />}
			// 	</Route>
			// 	<Route path="/main" component={Main} />
			// </Switch>
			<IdleTimer
				ref={this.idelTimerRef}
				timeout={this.state.timeout}
				crossTab={true}
				onIdle={this.onIdle}
				onActive={this.onAction}>
				{!this.state.isTimedOut ? null : <Idle />}

				<Router>
					<Navbar />

					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route exact path="/home" component={Home} />
						<Route exact path="/main" component={Main} />
						<Route exact path="/signin" component={AuthForm} />
						<Route exact path="/learning" component={Learning} />
					</Switch>
				</Router>
			</IdleTimer>
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
		autoSignin: () => dispatch(autoSignin())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
