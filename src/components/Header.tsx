import { Icon } from '../svg';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <Icon name='logo' />
      </div>
      <div className='header__text'>
        <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p>Secure your spot at next year's biggest coding conference.</p>
      </div>
    </header>
  );
};
export default Header;
