import { useState } from 'react'
import { ImgUploader } from '../cmps/ImgUploader'


export function LoginForm({ onLogin, isSignup }) {
    const [credentials, setCredentials] = useState('')

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
            <div></div>
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
                        <label className="fullname">Full name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Full name"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                    </>
                )}

                <button className="btn-submit">{isSignup ? 'Sign up' : 'Log In'}</button>
            </form>
        </article>
    )
}