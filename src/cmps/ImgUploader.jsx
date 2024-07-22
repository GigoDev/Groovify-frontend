import { useState } from 'react'
import { uploadService } from '../services/upload.service'

import MusicNoteIcon from '../assets/icons/MusicNoteIcon.svg'
import LoaderIcon from '../assets/icons/LoaderIcon.svg'
import PencilIcon from '../assets/icons/PencilIcon.svg'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="img-uploader-container">
      {imgData.imgUrl ? (
        <img src={imgData.imgUrl} className="fit-img" />
      ) : (
        <div className="alt-img">
          {!isUploading && <MusicNoteIcon />}
        </div>
      )}

      {isUploading && (
        <div className="loader-container">
          <LoaderIcon />
        </div>
      )}

      <label className="img-uploader">
        <div className="img-change-cover">
          <div>
            <PencilIcon />
            <h4 className="light">{getUploadLabel()}</h4>
          </div>
        </div>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={uploadImg}
          style={{ display: 'none'}}
          id="imgUpload"
        />
      </label>
    </div>
  )
}
