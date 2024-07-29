export const uploadService = {
	uploadImg,
}

async function uploadImg(file) {
	
	const CLOUD_NAME = 'dzl5lalwt' //Cloud name
	const UPLOAD_PRESET = 'groovify-preset' //preset settings
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
	const formData = new FormData()
	
    // Building the request body
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)
	
    // Sending a post method request to Cloudinary API
	try {
		const res = await fetch(UPLOAD_URL,{
			method: 'POST', 
			body: formData 
		})
		const { url } = await res.json()
		return url

	} catch (err) {
		console.error("Error uploading image to cloudinery", err)
		throw err
	}
}