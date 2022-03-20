import React from 'react'
import { connect } from 'react-redux'

import Brand from './Brand'
import AuthInput from './AuthInput'

class AuthForm extends React.Component {
	constructor() {
		super()
		this.state = {
			signin: true,
			username: '',
			password: '',
			firstName: '',
			lastName: ''
		}
		this.handleAuthType = this.handleAuthType.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleAuthType() {
		this.setState(prv => {
			return { signin: !prv.signin }
		})
	}

	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value })
	}

	render() {
		console.log(this.state)
		return (
			<div className="auth__wrapper">
				<header className="brand__wrapper">
					<Brand />
				</header>

				<form className="authForm">
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
						</>
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

export default AuthForm
