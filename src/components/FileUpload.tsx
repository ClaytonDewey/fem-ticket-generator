import avatarImg from '../images/image-avatar.jpg';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '.';
import { Icon } from '../svg';

const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='form-group' {...getRootProps()}>
      <label htmlFor='avatar'>Upload Avatar:</label>
      <div className='upload blur'>
        <div className='form-icon'>
          <img src={avatarImg} alt='Avatar' />
        </div>
        {/* <div className='form-icon blur'>
          <Icon name='upload' />
        </div> */}
        <Input name='avatar' id='avatar' {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop or click to upload</p>
        )}
      </div>
      <p>
        <Icon name='info' /> Upload your photo (JPG or PNG, max size: 500KB).
      </p>
      {files.length !== 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
