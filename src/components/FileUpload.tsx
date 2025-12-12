import { useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Input } from '.';
import { Icon } from '../svg';

import useTicketStore from '../store/useTicketStore';

interface DropzoneFile extends File {
  preview: string;
}

interface FileUploadProps {
  error?: string;
}

const FileUpload = ({ error }: FileUploadProps) => {
  const { avatar, setAvatar } = useTicketStore();
  const [files, setFiles] = useState<DropzoneFile[]>([]);
  const { getRootProps, getInputProps, open, isDragActive, fileRejections } =
    useDropzone({
      maxSize: 500000, // 500KB
      maxFiles: 1,
      accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
      },
      onDrop: (acceptedFiles: FileWithPath[]) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  useEffect(() => {
    if (files.length > 0) {
      const { preview } = files[0];
      console.log(preview);
      setAvatar(files[0].preview as string);
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    } else {
      setAvatar('');
    }
  }, [files, setAvatar]);

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles([]);
  };

  const handleChangeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    // The dropzone will handle the file selection
    setFiles([]);
    open();
  };

  return (
    <div
      className={`form-group ${error ? 'is-invalid-input' : ''}`}
      {...getRootProps()}>
      <label htmlFor='avatar'>Upload Avatar</label>
      <div className='upload blur'>
        <div className='form-icon blur'>
          {avatar ? (
            <img src={avatar} alt='Avatar Preview' />
          ) : (
            <Icon name='upload' />
          )}
        </div>
        <Input name='avatar' id='avatar' {...getInputProps()} />
        {files.length > 0 ? (
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-edit blur'
              style={{ textDecoration: 'underline' }}
              onClick={handleRemoveImage}>
              Remove Image
            </button>
            <button
              type='button'
              className='btn btn-edit blur'
              onClick={handleChangeImage}>
              Change Image
            </button>
          </div>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop or click to upload</p>
        )}
      </div>
      {error && (
        <p className='error-message'>
          <Icon name='info' /> {error}
        </p>
      )}
      {fileRejections.length > 0 && (
        <>
          {fileRejections.map((file) => (
            <div key={file.file.path}>
              {file.errors.map((error) => (
                <p key={error.code} className='error-message'>
                  <Icon name='info' />{' '}
                  {error.code === 'file-too-large'
                    ? 'File too large. Max size is 500KB.'
                    : error.code === 'file-invalid-type'
                    ? 'Invalid file type. Only JPG and PNG are allowed.'
                    : error.message}
                </p>
              ))}
            </div>
          ))}
        </>
      )}
      {!error && fileRejections.length === 0 && (
        <p>
          <Icon name='info' /> Upload your photo (JPG or PNG, max size: 500KB).
        </p>
      )}
    </div>
  );
};

export default FileUpload;
