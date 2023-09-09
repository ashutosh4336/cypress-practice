import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className='main-header'>
      <img src={logo} alt='TasksImage' data-cy='main-image' />
      <h1 data-cy='main-title' className='main-title'>
        React Tasks
      </h1>
    </header>
  );
}

export default Header;
