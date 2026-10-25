import styles from './LoadingPage.module.css';
    
type LoadingPageProps = {};

export function LoadingPage({}: LoadingPageProps) {
    return (
        <div className={styles.view}>
            <div className={styles.view__navigationBar}>
                <div className={styles.skeleton}></div>
            </div>
            <div className={styles.view__content}>
                <div className={styles.content__header}>
                    <div className={styles.skeleton}></div>
                </div>
                <div className={styles.content__container}>
                    <div className={styles.skeleton}></div>
                </div>
            </div>
        </div>
    );
}