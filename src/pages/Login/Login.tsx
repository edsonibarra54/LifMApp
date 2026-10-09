import styles from './Login.module.css';
import Logo from '../../assets/LifMApp_Logo.svg?react';
import { useTheme, ThemeToggle } from '../../theme';

export function Login() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.view}>
            <section className={styles.view__left}>
                <div className={styles.logo__section}>
                    <Logo className={styles.header__logo}/>
                    <h1>LifMApp</h1>
                </div>
                <div className={styles.motto}>
                    <p>Your finances, clearly organized</p>
                    <h2>Give every payment a clear purpose.</h2>
                    <p>Create your distribution once and use it to organize every new payroll payment.</p>
                </div>
                <span>Simple. Private. Always available.</span>
            </section>
            <section className={styles.view__right}>
                <div className={styles.header}>
                    <div className={styles.logo__section}>
                        <Logo className={styles.header__logo}/>
                        <h1>LifMApp</h1>
                    </div>
                    <div onClick={toggleTheme}>
                        <ThemeToggle theme={theme} className={styles.toggle}/>
                    </div>
                </div>
                <div className={styles.welcome}>
                    <span>WELCOME</span>
                    <h2>Organize every payment with confidence</h2>
                    <p>Sign in to keep your distributions, reports, and future goals secure.</p>
                    <button>Continue with Google</button>
                    <p>By continuing, you agree to save your account information.</p>
                </div>
                <div></div>
            </section>
        </div>
    )
}