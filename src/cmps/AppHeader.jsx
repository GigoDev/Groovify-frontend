import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { SearchCategory } from './SearchCategory'

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
				<button className="back-btn btn">
					<svg role="img" height="18" width="18" aria-hidden="true" className="Svg-sc-ytk21e-0 kcBZLg IYDlXmBmmUKHveMzIPCF"
						viewBox="0 0 24 24">
						<path
							d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z">
						</path>
					</svg>
				</button>

				<button className="forward-btn btn">
					<svg role="img" height="18" width="18" aria-hidden="true" className="Svg-sc-ytk21e-0 kcBZLg IYDlXmBmmUKHveMzIPCF"
						viewBox="0 0 24 24">
						<path
							d="M8.043 2.793a1 1 0 000 1.414L15.836 12l-7.793 7.793a1 1 0 101.414 1.414L18.664 12 9.457 2.793a1 1 0 00-1.414 0z">
						</path>
					</svg>
				</button>
				<SearchCategory />
			</nav>
			<section className='header-menu flex align-center'>
				<button className='btn pill install-btn'><i className="fa-regular fa-circle-down"></i>Install App</button>
				<button className='btn round notification-btn'><i className="fa-regular fa-bell"></i></button>
				<button className='btn round  user-btn'>G</button>
			</section>
		</header>
	)
}
