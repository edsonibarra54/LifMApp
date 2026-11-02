import { ButtonComponent, InputGroupComponent, TextFieldComponent } from '../../components';
import styles from './UsernameSetup.module.css';
import Logo from '../../assets/LifMApp_Logo.svg?react';
    
type UsernameSetupProps = {};

export function UsernameSetup({}: UsernameSetupProps) {
    return (
        <div className={styles.view}>
            <div className={styles.labels}>
                <div className={styles.logo__section}>
                    <Logo className={styles.header__logo} />
                    <h1>LifMApp</h1>
                </div>
                <div className={styles.labels__top}>
                    <span className={styles.principalLabel}>SET UP YOUR PROFILE</span>
                    <h2>Choose your username</h2>
                    <p>This is how your name will appear throughout your payroll workspace.</p>
                </div>
                <InputGroupComponent label='Username' helper='3–24 characters. Letters, numbers, periods, underscores, and hyphens are allowed.'>
                    <TextFieldComponent prefix='@'></TextFieldComponent>
                </InputGroupComponent>
                <ButtonComponent className={styles.button} color='neutral'>
                    Create profile
                </ButtonComponent>
            </div>
        </div>
    );
}