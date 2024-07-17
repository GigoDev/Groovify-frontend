import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadReviews, removeReview, getActionAddReview, getActionRemoveReview } from '../store/actions/review.actions'
import { loadUsers } from '../store/actions/user.actions'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from '../cmps/ReviewList'
import { ReviewEdit } from '../cmps/ReviewEdit'

export function ReviewIndex() {
	const loggedInUser = useSelector(storeState => storeState.userModule.user)
	const reviews = useSelector(storeState => storeState.reviewModule.reviews)

	const dispatch = useDispatch()

	useEffect(() => {
		loadReviews()
		loadUsers()
	}, [])

	async function onRemoveReview(reviewId) {
		try {
			await removeReview(reviewId)
			showSuccessMsg('Review removed')
		} catch (err) {
			showErrorMsg('Cannot remove')
		}
	}

	return <div className="review-index">
        <h2>Reviews and Gossip</h2>
        {loggedInUser && <ReviewEdit/>}
        <ReviewList 
            reviews={reviews} 
            onRemoveReview={onRemoveReview}/>
    </div>
}