import React from 'react'

const ContactRow = props => {
    const { developer } = props;
    const { id, name, linkedInURL, gitHubURL } = developer;
    return (
        <div className="developer-row">
            <ul>
                <li>{name} | <span> <a href={linkedInURL}> <img src="linkedIn_logo.png" className="linkedInLogo" /></a> </span>| <span> <a href={gitHubURL}> <img src="github_logo.png" className="gitHubLogo" /></a></span> </li>
            </ul>
        </div>
    )
}

export default ContactRow