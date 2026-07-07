import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowRight,
  FaUser,
  FaTimes,
} from 'react-icons/fa';
import GoldDustBackground from '../../components/GoldDustBackground';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import logoImage from '../../assets/images/lyracore-bg.png';

const loginSchema = yup.object().shape({
  email: yup.string().email('Geçerli email girin').required('Email zorunlu'),
  password: yup.string().min(6, 'Şifre en az 6 karakter').required('Şifre zorunlu'),
});

const registerSchema = yup.object().shape({
  name: yup.string().min(2, 'En az 2 karakter').required('Ad Soyad zorunlu'),
  email: yup.string().email('Geçerli email girin').required('Email zorunlu'),
  password: yup.string().min(6, 'Şifre en az 6 karakter').required('Şifre zorunlu'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre tekrarı zorunlu'),
});

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { theme } = useTheme();

  const loginForm = useForm({ resolver: yupResolver(loginSchema) });
  const registerForm = useForm({ resolver: yupResolver(registerSchema) });

  useEffect(() => {
    if (searchParams.get('mode') === 'register' || location.pathname === '/register') {
      setShowRegister(true);
    }
  }, [searchParams, location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showRegister ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showRegister]);

  const openRegister = () => {
    setShowRegister(true);
    setSearchParams({ mode: 'register' });
  };

  const closeRegister = () => {
    setShowRegister(false);
    setSearchParams({});
    registerForm.reset();
  };

  const onLogin = async (data) => {
    setLoginLoading(true);
    setTimeout(() => {
      console.log('Login:', data);
      setLoginLoading(false);
    }, 1500);
  };

  const onRegister = async (data) => {
    setRegisterLoading(true);
    setTimeout(() => {
      console.log('Register:', data);
      setRegisterLoading(false);
      closeRegister();
      loginForm.setValue('email', data.email);
    }, 1500);
  };

  return (
    <div className={`auth-page ${theme}`}>
      <GoldDustBackground mousePos={mousePos} />

      <div
        className="mouse-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
        aria-hidden="true"
      />

      <div className="auth-top-bar">
        <ThemeToggle />
      </div>

      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="auth-brand">
            <img src={logoImage} alt="LyraCore" className="auth-brand-logo" />
          </div>

          <div className="auth-title">
            <h1>Giriş Yap</h1>
            <p>
              <FaShieldAlt /> Hesabınıza güvenli erişim
            </p>
          </div>

          <form className="auth-form" onSubmit={loginForm.handleSubmit(onLogin)}>
            <div className="form-group">
              <label htmlFor="login-email">Email Adresi</label>
              <div className="input-wrapper">
                <FaEnvelope />
                <input
                  id="login-email"
                  type="email"
                  placeholder="ornek@lyracore.com"
                  className={loginForm.formState.errors.email ? 'input-error' : ''}
                  {...loginForm.register('email')}
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="error-text">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Şifre</label>
              <div className="input-wrapper">
                <FaLock />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={loginForm.formState.errors.password ? 'input-error' : ''}
                  {...loginForm.register('password')}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Şifreyi göster/gizle"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="error-text">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Beni Hatırla
              </label>
              <a href="#forgot">Şifremi Unuttum</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loginLoading}>
              {loginLoading ? (
                <>
                  <span className="loading" /> Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Hesabın yok mu?{' '}
              <button type="button" className="link-btn" onClick={openRegister}>
                Kayıt Ol <FaArrowRight />
              </button>
            </p>
          </div>

          <p className="auth-copyright">© 2026 LyraCore. Tüm hakları saklıdır.</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showRegister && (
          <>
            <motion.div
              className="register-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeRegister}
            />

            <motion.aside
              className="register-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <button
                type="button"
                className="register-close"
                onClick={closeRegister}
                aria-label="Kapat"
              >
                <FaTimes />
              </button>

              <div className="register-panel-inner">
                <div className="auth-brand small">
                  <img src={logoImage} alt="LyraCore" className="auth-brand-logo" />
                </div>

                <div className="auth-title">
                  <h1>
                    Kayıt <span>Ol</span>
                  </h1>
                  <p>LyraCore ailesine katıl</p>
                </div>

                <form
                  className="auth-form"
                  onSubmit={registerForm.handleSubmit(onRegister)}
                >
                  <div className="form-group">
                    <label htmlFor="reg-name">Ad Soyad</label>
                    <div className="input-wrapper">
                      <FaUser />
                      <input
                        id="reg-name"
                        type="text"
                        placeholder="Adınız Soyadınız"
                        className={registerForm.formState.errors.name ? 'input-error' : ''}
                        {...registerForm.register('name')}
                      />
                    </div>
                    {registerForm.formState.errors.name && (
                      <p className="error-text">{registerForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-email">Email</label>
                    <div className="input-wrapper">
                      <FaEnvelope />
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="ornek@lyracore.com"
                        className={registerForm.formState.errors.email ? 'input-error' : ''}
                        {...registerForm.register('email')}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="error-text">{registerForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-password">Şifre</label>
                    <div className="input-wrapper">
                      <FaLock />
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="En az 6 karakter"
                        className={registerForm.formState.errors.password ? 'input-error' : ''}
                        {...registerForm.register('password')}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="error-text">{registerForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="reg-confirm">Şifre Tekrar</label>
                    <div className="input-wrapper">
                      <FaLock />
                      <input
                        id="reg-confirm"
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Şifrenizi tekrar girin"
                        className={
                          registerForm.formState.errors.confirmPassword ? 'input-error' : ''
                        }
                        {...registerForm.register('confirmPassword')}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="error-text">
                        {registerForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn-submit" disabled={registerLoading}>
                    {registerLoading ? (
                      <>
                        <span className="loading" /> Kayıt yapılıyor...
                      </>
                    ) : (
                      <>
                        Hesap Oluştur <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                <div className="auth-footer">
                  <p>
                    Zaten hesabın var mı?{' '}
                    <button type="button" className="link-btn" onClick={closeRegister}>
                      Giriş Yap
                    </button>
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
