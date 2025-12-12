import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box } from '@mui/material';
import { Icon } from '../svg';

import { Button, ImageCropper } from '.';
import { getCroppedImg, blobToBase64 } from '../util';
import { Area } from 'react-easy-crop';

interface ImageUploadProps {
  handleClose: () => void;
  openModal: boolean;
}

export interface ImageProperties {
  zoom: number;
  rotation: number;
  croppedAreaPixels: Area;
}

const ImageUploadModal = ({ handleClose, openModal }: ImageUploadProps) => {
  const [dragEnter, setDragEnter] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const uploadAvatarInputRef = useRef<HTMLInputElement>(null);
  const [imageProperties, setImageProperties] = useState<ImageProperties>({
    zoom: 1,
    rotation: 0,
    croppedAreaPixels: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  });

  /* on dragging over the valid dropzone area */
  const handleDragOver = (event: React.MouseEvent) => {
    setDragEnter(true);
    event.preventDefault();
    event.stopPropagation();
  };

  /* on dragging out the valid dropzone area */
  const handleDragLeave = (event: React.DragEvent) => {
    setDragEnter(false);
    event.preventDefault();
    event.stopPropagation();
  };

  /* on drop of image onto the valid dropzone */
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    setDragEnter(false);
    validateAndUploadFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event?.target?.files[0];
    validateAndUploadFile(file);
  };
  const attachButtonHandler = () => {
    if (uploadAvatarInputRef.current) uploadAvatarInputRef.current.click();
    else console.error('uploadAvatarInputRef is null');
  };

  const cancelUpload = () => {
    setError('');
    setSelectedImage(null);
  };

  const validateAndUploadFile = (file: File) => {
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setError('Please upload a .jpeg/.jpg or .png file type');
        return;
      }
      if (file.size > maxSize) {
        setError('Image file size should be less than 5MB');
        return;
      }
      setError('');
      const reader: FileReader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const { rotation, croppedAreaPixels } = imageProperties;
    if (!selectedImage) {
      setError('No image selected. Please upload an image.');
      return;
    }
    const croppedImage: Blob | null = await getCroppedImg(
      selectedImage,
      croppedAreaPixels,
      rotation
    );
    if (!croppedImage) {
      setError('Failed to crop the image. Please try again.');
      return;
    }
    const base64Image: string = await blobToBase64(croppedImage);
    localStorage.setItem('userProfilePic', base64Image);
    handleClose();
  };

  const handleChangeImage = () => {
    cancelUpload();
    if (uploadAvatarInputRef.current) uploadAvatarInputRef.current.click();
  };
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby='image-upload-modal'>
      <Box className='upload-pic-container modal-box'>
        <div className='header-container'>
          <div className='title-section'>
            <h3>Upload Photo</h3>
            <p>Upload a photo of yourself to personalize your profile.</p>
          </div>
          <Button className='close-btn' onClick={handleClose}>
            <Icon name='close' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>

        <div className='upload-section'>
          {selectedImage ? (
            <ImageCropper
              uploadedImage={selectedImage}
              setImageProperties={setImageProperties}
            />
          ) : (
            <div className='form-group'>
              <label
                htmlFor='fileInput'
                className={`upload-box ${dragEnter ? 'drag-enter' : ''}`}
                onDragEnter={handleDragOver}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}>
                <input
                  type='file'
                  id='fileInput'
                  accept='image/*'
                  onChange={handleFileChange}
                  hidden
                  ref={uploadAvatarInputRef}
                />
                {dragEnter
                  ? `Drop the file here`
                  : `Attach or Drag & Drop your photo here`}
              </label>
              <p>
                <Icon name='info' /> Upload your photo (JPG or PNG, max size:
                500KB).
              </p>
            </div>
          )}
          {error && (
            <p className='error-message'>
              <Icon name='info' /> {error}
            </p>
          )}
        </div>

        <div className='upload-footer'>
          {selectedImage === null ? (
            <>
              <Button
                type='button'
                className='btn btn-primary'
                onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type='button'
                className='btn btn-primary'
                onClick={() => attachButtonHandler()}>
                Attach Photo
              </Button>
            </>
          ) : (
            <>
              <Button
                type='button'
                className='btn btn-edit blur'
                style={{ textDecoration: 'underline' }}
                onClick={handleChangeImage}>
                Change Photo
              </Button>
              <Button
                type='button'
                className='btn btn-edit blur'
                onClick={handleSubmit}>
                Upload Photo
              </Button>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

ImageUploadModal.propTypes = {
  handleClose: PropTypes.func,
};

export default ImageUploadModal;
