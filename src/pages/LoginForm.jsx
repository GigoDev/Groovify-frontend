import { useState } from 'react'
import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user/user.service.remote'



export function LoginForm({ onLogin, isSignup }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    function onUploaded(imgUrl) {
        setCredentials(credentials => ({ ...credentials, imgUrl }))
    }

    return (
        <article className="login-form">
            <form className="login-form flex column align-center" onSubmit={handleSubmit}>
                <label className="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />


                <label className="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />

                {isSignup && (
                    <>

                        <ImgUploader onUploaded={onUploaded} />
                    </>
                )}

                <button className="btn-submit">{isSignup ? 'Sign up' : 'Log In'}</button>
            </form>
        </article>
    )
}