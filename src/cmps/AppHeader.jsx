import { Link, useNavigate } from 'react-router-dom'
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

	function handleClick(){
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (/android/i.test(userAgent)) {
		  // Redirect to Google Play Store for Android
		  window.location.href = 'https://play.google.com/store/apps/details?id=com.spotify.music';
		} else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		  // Redirect to App Store for iOS
		  window.location.href = 'https://apps.apple.com/us/app/spotify/id324684580';
		} else {
		  // Redirect to Spotify website for other platforms (Desktop)
		  window.location.href = 'https://www.spotify.com/download';
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
				<button className='btn pill install-btn pointer' onClick={handleClick}><i className="fa-regular fa-circle-down"></i>Install App</button>
				<button className='btn round notification-btn'><i className="fa-regular fa-bell"></i></button>
				<Link to='login'><button className='btn round  user-btn'>G</button></Link>
			</section>
		</header>
	)
}

