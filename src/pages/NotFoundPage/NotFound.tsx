import { ButtonComponent } from '../../components';
import { useNavigate } from "react-router";
import styles from './NotFound.module.css';

export function NotFound() {
    let navigate = useNavigate();

    return (
        <div className={styles.view}>
            <span className={styles.view__title}>404</span>
            <div className={styles.view__content}>
                <span>Oooops!!</span>
                <p>This page doesn't exist or is unavailable</p>
            </div>
            <ButtonComponent className={styles.view__button} onClick={() => navigate('/')}>Go Back to Home</ButtonComponent>
        </div>
    )
}