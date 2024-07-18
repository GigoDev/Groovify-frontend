import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header ">
			<nav className='flex'>
				<button className="back-btn" ><i className="fa-solid fa-chevron-left"></i></button>
				<button className="forward-btn"><i className="fa-solid fa-chevron-right"></i></button>
			</nav>
			<section className='header-menu flex'>
				<button className='install-btn'><i class="fa-regular fa-circle-down"></i>Install App</button>
				<button className='notification-btn'><i class="fa-regular fa-bell"></i></button>
				<button className='user-btn'></button>
			</section>
		</header>
	)
}
