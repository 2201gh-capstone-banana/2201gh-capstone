import React from 'react'

const ContactRow = props => {
    const { developer } = props;
    const { id, name, linkedInURL, gitHubURL, bitmoji } = developer;
    return (
        <div className="developer-row">
            <ul>
                <li className='developer-info'><div className="bitmoji" ><img src={bitmoji}/></div>{name} | <div className="linkedInLogo" > <a href={linkedInURL}> <img src="linkedIn_logo.png" /></a> </div> | <div className="gitHubLogo" > <a href={gitHubURL}> <img src="github_logo.png"/></a></div> </li>
            </ul>
        </div>
    )
}

export default ContactRow