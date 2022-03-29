import React from 'react'
const AuthInput = props => {
	return (
		<div className={`auth__input-wrapper + ${props.for}__wrapper`}>
			<label className={`auth__label ${props.for}__label`} htmlFor={props.for}>
				{props.for}
			</label>
			<input
				className={`auth__input ${props.for}__input`}
				type={props.type}
				onChange={props.onChange}
				value={props.value}
				name={props.for}
				id={props.for}
			/>
		</div>
	)
}

export default AuthInput
