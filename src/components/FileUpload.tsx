import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '.';
import { Icon } from '../svg';

import useTicketStore from '../store/useTicketStore';

const FileUpload = () => {
  const { avatar, setAvatar } = useTicketStore();
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles); // Store the dropped files in state
    // You can also process or upload files here
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);

      // Cleanup: revoke the object URL when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl('');
    }
  }, [files]);

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles([]);
  };

  const handleChangeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    // The dropzone will handle the file selection
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='form-group' {...getRootProps()}>
      <label htmlFor='avatar'>Upload Avatar:</label>
      <div className='upload blur'>
        <div className='form-icon blur'>
          {previewUrl ? (
            <img src={previewUrl} alt='Avatar Preview' />
          ) : (
            <Icon name='upload' />
          )}
        </div>
        <Input name='avatar' id='avatar' {...getInputProps()} />
        {files.length > 0 ? (
          <div className='btn-container'>
            <button className='btn btn-edit blur' onClick={handleRemoveImage}>
              Remove Image
            </button>
            <button className='btn btn-edit blur' onClick={handleChangeImage}>
              Change Image
            </button>
          </div>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop or click to upload</p>
        )}
      </div>
      <p>
        <Icon name='info' /> Upload your photo (JPG or PNG, max size: 500KB).
      </p>
    </div>
  );
};

export default FileUpload;
