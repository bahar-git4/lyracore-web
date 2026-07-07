import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
    >
      <span className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`}>
        <FaMoon />
      </span>
      <span className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`}>
        <FaSun />
      </span>
      <span className={`theme-toggle-slider ${theme}`} />
    </button>
  );
};

export default ThemeToggle;
