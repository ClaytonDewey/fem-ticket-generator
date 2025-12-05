import { Button, FileUpload, Input } from '.';

const Form = () => {
  return (
    <form className='form'>
      <fieldset>
        <legend className='sr-only'>Personal Information</legend>
        <FileUpload />
        <div className='form-group'>
          <label htmlFor='name'>Full Name</label>
          <Input className='blur' type='text' id='name' name='name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <Input
            className='blur'
            type='email'
            id='email'
            name='email'
            required
            placeholder='example@email.com'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='gitUser'>GitHub Username</label>
          <Input
            className='blur'
            type='text'
            id='gitUser'
            name='gitUser'
            required
            placeholder='@yourusername'
          />
        </div>
        <Button type='submit' className='btn btn-primary'>
          Generate My Ticket
        </Button>
      </fieldset>
    </form>
  );
};
export default Form;
