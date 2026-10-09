import styles from './Login.module.css';
import Logo from '../../assets/LifMApp_Logo.svg?react';
import { ButtonComponent } from '../../components';

export function Login() {

    return (
        <div className={styles.view}>
            <section className={styles.view__left}>
                <div className={styles.logo__section}>
                </div>
                <div className={styles.motto}>
                    <p>Your life, clearly organized</p>
                    <h2>Have control of your own things</h2>
                    <p>Organize everything today and facilitate everything tomorrow.</p>
                </div>
                <span>Simple. Private. Always available.</span>
            </section>
            <section className={styles.view__right}>
                <div className={styles.header}>

                </div>
                <div className={styles.labels}>
                    <div className={styles.logo__section}>
                        <Logo className={styles.header__logo}/>
                        <h1>LifMApp</h1>
                    </div>
                    <div className={styles.labels__top}>
                        <span>WELCOME</span>
                        <h2>Organize every chore with confidence</h2>
                        <p>Sign in to keep your distributions, reports, and future goals secure.</p>
                    </div>
                    <ButtonComponent className={styles.button} color='neutral'>
                        <span>G</span>
                        Continue with Google
                    </ButtonComponent>
                    <p>By continuing, you agree to save your account information.</p>
                </div>
                <div></div>
            </section>
        </div>
    )
}