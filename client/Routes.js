import React from 'react'
import { Route, Switch } from 'react-router-dom'

/* Components. */
import LandingPage from './components/LandingPage'
import AuthForm from './components/AuthForm'

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/signin" component={AuthForm} />
		</Switch>
	)
}

export default Routes
