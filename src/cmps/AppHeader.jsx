import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import BackPageIcon from '../assets/icons/BackPageIcon.svg'
import NextPageIcon from '../assets/icons/NextPageIcon.svg'


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
		<header className="header flex full">
			<nav className='flex'>

				<button className="back-btn btn" onClick={() => navigate(-1)}>
					<BackPageIcon />
				</button>
				<button className="forward-btn btn" onClick={() => navigate(1)}>
					<NextPageIcon />
				</button>
			</nav>
			<section className='header-menu flex align-center'>
				<button className='btn pill install-btn'><i className="fa-regular fa-circle-down"></i>Install App</button>
				<button className='btn round notification-btn'><i className="fa-regular fa-bell"></i></button>
				<button className='btn round  user-btn'>G</button>
			</section>
		</header>
	)
}

