import { useEffect, useState } from 'react';
import { Button, ImageUploadModal, Input } from '.';
import useTicketStore from '../store/useTicketStore';
import { Icon } from '../svg';

const Form = () => {
  const { avatar, setName, setEmail, setGitUser, setIsSubmitted } =
    useTicketStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gitUser: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isGitUserFocused, setIsGitUserFocused] = useState(false);
  const [profileImage, setProfileImage] = useState<string>();
  const [openImageUploadModal, setOpenImageUploadModal] =
    useState<boolean>(false);
  const [profileImageUpdated, setProfileImageUpdated] =
    useState<boolean>(false);

  useEffect(() => {
    const _userProfilePic = avatar || undefined;
    if (_userProfilePic) setProfileImage(_userProfilePic);
    else setProfileImage(undefined);
  }, [profileImageUpdated, avatar]);

  const onEditClick = () => {
    setProfileImageUpdated(false);
    setOpenImageUploadModal(true);
  };
  const handleClose = () => {
    setProfileImageUpdated(true);
    setOpenImageUploadModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove "@" prefix from gitUser if present
    let processedValue = value;
    if (name === 'gitUser' && value.startsWith('@')) {
      processedValue = value.slice(1);
    }

    // Use function updates to ensure latest state is used
    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateInput = () => {
    const newErrors: { [key: string]: string } = {};

    if (!avatar) {
      newErrors.avatar = 'Avatar is required';
    }
    if (formData.name === '') {
      newErrors.name = 'Name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.gitUser === '') {
      newErrors.gitUser = 'GitHub username is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      // Handle form submission logic here
      setName(formData.name);
      setEmail(formData.email);
      setGitUser(formData.gitUser);
      setIsSubmitted(true);
      setErrors({});
      setFormData({
        name: '',
        email: '',
        gitUser: '',
      });
    } else {
      console.log('Form has errors:', errors);
    }
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <fieldset>
          <legend className='sr-only'>Personal Information</legend>
          {/* <FileUpload error={errors.avatar} /> */}
          <img src={profileImage} alt='Profile' />
          <Button type='button' onClick={onEditClick}>
            Upload Image
          </Button>
          <div
            className={`form-group ${errors.name ? 'is-invalid-input' : ''}`}>
            <label htmlFor='name'>Full Name</label>
            <Input
              className='blur'
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className='error-message'>
                <Icon name='info' /> {errors.name}
              </p>
            )}
          </div>
          <div
            className={`form-group ${errors.email ? 'is-invalid-input' : ''}`}>
            <label htmlFor='email'>Email Address</label>
            <Input
              className='blur'
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='example@email.com'
            />
            {errors.email && (
              <p className='error-message'>
                <Icon name='info' /> {errors.email}
              </p>
            )}
          </div>
          <div
            className={`form-group ${
              errors.gitUser ? 'is-invalid-input' : ''
            }`}>
            <label htmlFor='gitUser'>GitHub Username</label>
            <Input
              className='blur'
              type='text'
              id='gitUser'
              name='gitUser'
              value={
                isGitUserFocused ? `@${formData.gitUser}` : formData.gitUser
              }
              onChange={handleChange}
              onFocus={() => setIsGitUserFocused(true)}
              onBlur={() => setIsGitUserFocused(false)}
              placeholder='@yourusername'
            />
            {errors.gitUser && (
              <p className='error-message'>
                <Icon name='info' /> {errors.gitUser}
              </p>
            )}
          </div>
          <Button type='submit' className='btn btn-primary'>
            Generate My Ticket
          </Button>
        </fieldset>
      </form>
      {openImageUploadModal && (
        <ImageUploadModal
          handleClose={() => handleClose()}
          openModal={openImageUploadModal}
        />
      )}
    </>
  );
};
export default Form;
