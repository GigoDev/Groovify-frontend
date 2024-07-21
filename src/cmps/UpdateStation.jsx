// import { useState } from "react";
// import { uploadService } from "../services/upload.service";

// // { station, setIsOnUpdate, onUpdateStation, handleStationUpdate }
export function UpdateStation() {

//     const [stationToUpdate, setStationToUpdate] = useState() // station
//     const [imagePreview, setImagePreview] = useState(null)
//     const [isHovering, setIsHovering] = useState(false)

//     function handleChange(ev) {
//         ev.stopPropagation()
//         const field = ev.target.name
//         const value = ev.target.value

//         setImagePreview(URL.createObjectURL(file))
//     }

//     async function handleFileChange(ev) {
//         const file = ev.target.files[0]
//         if (file) {
//             const filePreviewUrl = URL.createObjectURL(file)
//             setImagePreview(filePreviewUrl)

//             try {
//                 const uploadResponse = await uploadService.uploadImg(ev)

//             } catch (err) {
//                 console.error("Error uploading image:", err)
//             }

//         }
//     }

//     function handleSubmit(ev) {
//         ev.preventDefault()
//         ev.stopPropagation()

//         const formData = new FormData()
//         formData.append('image', stationToUpdate.imageFile)


//         closeModal()
//     }

//     function closeModal() {
//         setIsOnUpdate(false)
//     }

//     function handleModalClick(ev) {
//         ev.stopPropagation()
//     }

//     return (
//         <div className="update-modal-overlay" onClick={closeModal}>
//             <div className="update-modal flex" onClick={handleModalClick}>
//                 <form className="modal-content" onSubmit={handleSubmit}>
//                     <div className="modal-top">
//                         <h3>Edit details</h3>
//                         <button className="close-btn" onClick={closeModal}>
//                             <svg data-encore-id="icon" role="img" aria-label="Close" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 kcUFwU">
//                                 <path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path>
//                             </svg>
//                         </button>
//                     </div>
//                     <div className="content-container">

//                         <input className="station-name"
//                             type="text"
//                             id="txt"
//                             label="Name"
//                             name="name"
//                             value={stationToUpdate.name}
//                             // onChange={handleChange}
//                         />

//                         <pre>
//                             <textarea className="station-desc"
//                                 type="text"
//                                 id="txt"
//                                 label="Description"
//                                 name="desc"
//                                 value={stationToUpdate.desc}
//                                 // onChange={handleChange}
//                             />
//                         </pre>

//                         <div className="station-img"
//                             onMouseOver={() => setIsHovering(true)}
//                             onMouseOut={() => setIsHovering(false)}>

//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="image-preview" />
//                             ) : (
//                                 <label htmlFor="image-upload" className="image-upload-btn">

//                                     {isHovering ? (
//                                         <div className="svg-hover-txt">
//                                             <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="Svg-sc-ytk21e-0 bHdpig">
//                                                 <path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z">
//                                                 </path>
//                                             </svg>
//                                             <span>Choose photo</span>
//                                         </div>
//                                     ) : (
//                                         <svg data-encore-id="icon" role="img" aria-hidden="true" data-testid="playlist" class="Svg-sc-ytk21e-0 iYxpxA" viewBox="0 0 24 24">
//                                             <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z" fill="#b3b3af">
//                                             </path>
//                                         </svg>
//                                     )}

//                                 </label>
//                             )}
//                             <input
//                                 type="file"
//                                 id="image-upload"
//                                 name="image"
//                                 accept="image/*"
//                                 onChange={handleFileChange} hidden />
//                         </div>

//                         <p className="disclaimer">By proceeding, you agree to give Soundify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

//                         <button className="save-btn" type="submit">Save</button>
//                     </div>

//                 </form>
//             </div>

//         </div>
//     )
}