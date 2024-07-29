import { useEffect, useState } from "react"
import { uploadService } from '../services/upload.service'

export function UpdateStationModal({ station, isModalOpen, setIsModalOpen, onUpdateStation }) {
  const [textInput, setTextInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [stationImg, setStationImg] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const { name, description, imgs } = station

  useEffect(() => {
    loadStationData()
  }, [isModalOpen])

  async function loadStationData() {
    if (isModalOpen && station) {
      try {
        setTextInput(name || '')
        setDescInput(description || '')
        setStationImg(imgs && imgs.length > 0 ? imgs[0].url : '')
      } catch (error) {
        console.error('Failed to fetch station data:', error)
      }
    }
  }
  function closeModal() {
    setTextInput('')
    setDescInput('')
    setStationImg(null)
    setSelectedFile(null)
    setIsModalOpen((prevIsModalOpen => !prevIsModalOpen))
  }

  function onModalClick(ev) {
    ev.stopPropagation()
  }

  function handleInputChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    switch (field) {
      case 'title':
        setTextInput(value)
        break;

      case 'description':
        setDescInput(value)
        break;

      default:
        break;
    }
  }

  function handleFileInput(ev) {
    const file = ev.target.files[0]
    if (file) {// local url
      const imgUrl = URL.createObjectURL(file)
      setStationImg(imgUrl)
      setSelectedFile(file)
    }
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault()
    ev.stopPropagation()

    const stationToUpdate = { ...station }
    if (textInput) stationToUpdate.name = textInput
    if (descInput) stationToUpdate.description = descInput
    if (selectedFile) { //cloud url
      const imgCloudUrl = await uploadService.uploadImg(selectedFile)
      stationToUpdate.imgs = [{ url: imgCloudUrl }]
    }
    onUpdateStation(stationToUpdate)
    closeModal()
  }


  if (!isModalOpen) return null
  return (
    <section className="update-modal-container" onClick={closeModal}>
      <div className="modal" onClick={onModalClick}>
        <h1>Edit details</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="img-container" onClick={() => document.querySelector('.update-modal-img-input').click()}>
            {stationImg ? <img src={stationImg} alt="Station image" />
              : (
                <>
                  <svg data-encore-id="icon" role="img" aria-hidden="true" fill="grey" viewBox="0 0 24 24" className="tone-icon"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                  <svg data-encore-id="icon" role="img" fill="grey" aria-hidden="true" viewBox="0 0 24 24" className="edit-img-icon"><path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z"></path></svg>
                </>)}

          </div>

          <div className="inputs">
            <input
              type="text"
              name="title"
              className="title"
              placeholder="My Playlist #"
              value={textInput}
              onChange={handleInputChange}
            />
            <textarea
              type="text"
              name="description"
              className="description"
              placeholder="Add an optional description"
              value={descInput}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn save-btn" type="submit">Save</button>
        </form>
        <span>By proceeding, you agree to give Groovify access to the image you choose to upload. Please make sure you have the right to upload the image.</span>
        <button className="close-btn" onClick={closeModal}>
          <svg data-encore-id="icon" role="img" aria-label="Close" fill="white" aria-hidden="true" viewBox="0 0 16 16" className="Svg-close-btn"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z"></path></svg>
        </button>

        <input type="file"
          name="img"
          accept="image/*"
          className="update-modal-img-input"
          onChange={handleFileInput}
          hidden
        />
      </div>

    </section>

  )
}
