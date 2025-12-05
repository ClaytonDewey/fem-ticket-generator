import { Icon } from '../svg';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <Icon name='logo' />
      </div>
      <div className='header__text'>
        {/* <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p>Secure your spot at next year's biggest coding conference.</p> */}

        <h1>
          Congrats, <span>Clayton Dewey</span>! Your ticket is ready.
        </h1>
        <p>
          We've emailed your ticket to <span>clay@dryadmedia.com</span> and will
          send updates in the run up to the event.
        </p>
      </div>
    </header>
  );
};
export default Header;
