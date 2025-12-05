import { Icon } from '../svg';
import useTicketStore from '../store/useTicketStore';

const Header = () => {
  const { isSubmitted, name, email } = useTicketStore();
  return (
    <header className='header'>
      <div className='header__logo'>
        <Icon name='logo' />
      </div>
      <div className='header__text'>
        {!isSubmitted ? (
          <>
            <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
            <p>Secure your spot at next year's biggest coding conference.</p>
          </>
        ) : (
          <>
            <h1>
              Congrats, <span>{name}</span>! Your ticket is ready.
            </h1>
            <p>
              We've emailed your ticket to <span>{email}</span> and will send
              updates in the run up to the event.
            </p>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
