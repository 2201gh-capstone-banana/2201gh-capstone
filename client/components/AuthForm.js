import React from 'react'
import { connect } from 'react-redux'

/* Components. */
import Brand from './Brand'
import AuthInput from './AuthInput'

/* Thunks and action creators. */
import { manualSignin, _clearAlert, signup } from '../store/auth'

class AuthForm extends React.Component {
	constructor() {
		super()
		this.state = {
			signin: true,
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			email: ''
		}
		this.handleAuthType = this.handleAuthType.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleAuthType() {
		/* If there is an alert clear it when the user toggles between signin and signup. */
		this.props.clearAlert()

		this.setState(prv => {
			return { signin: !prv.signin }
		})
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value })
	}

	handleSubmit(evt) {
		evt.preventDefault()

		/* Checks if the user is on signin or signup. */
		if (this.state.signin) {
			const userData = {
				username: this.state.username,
				password: this.state.password
			}
			this.props.manualSignin(userData)
		} else {
			const userData = {
				username: this.state.username,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email
			}

			this.props.signup(userData)
		}
	}

	render() {
		return (
			<div className="auth__wrapper">
				<header className="brand__wrapper">
					<Brand />
				</header>

				<form onSubmit={this.handleSubmit} className="authForm">
					<AuthInput
						for="username"
						onChange={this.handleChange}
						value={this.state.username}
					/>
					<AuthInput
						for="password"
						onChange={this.handleChange}
						value={this.state.password}
					/>
					{!this.state.signin ? (
						<>
							<AuthInput
								for="firstName"
								onChange={this.handleChange}
								value={this.state.firstName}
							/>

							<AuthInput
								for="lastName"
								onChange={this.handleChange}
								value={this.state.lastName}
							/>

							<AuthInput
								for="email"
								onChange={this.handleChange}
								value={this.state.email}
							/>
						</>
					) : null}

					{this.props.alert ? (
						<div className="auth__alert">{this.props.alert}</div>
					) : null}

					<button className="authSubmit" type="submit">
						Submit
					</button>

					<button
						onClick={this.handleAuthType}
						className="authChange"
						type="button">
						{this.state.signin ? 'signup instead' : 'back to signin'}
					</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		alert: state.auth.alert
	}
}

const mapDispatchToProps = dispatch => {
	return {
		manualSignin: userData => dispatch(manualSignin(userData)),
		clearAlert: () => dispatch(_clearAlert()),
		signup: userData => dispatch(signup(userData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
