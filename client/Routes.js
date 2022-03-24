import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

/* Thunk. */
import { autoSignin } from './store/auth'

/* Components. */
import LandingPage from './components/LandingPage'
import AuthForm from './components/AuthForm'
import Main from './components/Main'
import Learning from './components/Learning'
import Home from './components/Home'

class Routes extends React.Component {
	componentDidMount() {
		this.props.autoSignin()
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={LandingPage} />
				{/*
					For auto signin when token is in local storage.
					Hide the signin page if token is valid.
				*/}
				<Route path="/signin">
					{this.props.correctUser ? <Redirect to="/main" /> : <AuthForm />}
				</Route>
				<Route exact path="/home" component={Home} />
				<Route path="/main" component={Main} />
				<Route path="/learning" component={Learning} />
			</Switch>
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
