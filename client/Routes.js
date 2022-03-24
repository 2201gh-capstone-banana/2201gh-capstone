import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

/* Thunk. */
import { autoSignin } from './store/auth'

/* Components. */
import LandingPage from './components/LandingPage'
import AuthForm from './components/AuthForm'
import Main from './components/Main'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Learning from './components/Learning'
import WordleApp from './components/Wordle/WordleApp'

class Routes extends React.Component {
	componentDidMount() {
		this.props.autoSignin()
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
			<Router>
				<Navbar />

				<Switch>
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/main" component={Main} />
					<Route exact path="/signin" component={AuthForm} />
					<Route exact path="/learning" component={Learning} />
					<Route path="/wordle" component={WordleApp}/>
				</Switch>
			</Router>
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
