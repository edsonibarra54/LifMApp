import { Outlet } from 'react-router';
import { ThemeToggle, useTheme } from '../../theme';
import styles from  './AuthLayout.module.css';

export function AuthLayout (){
    const { theme, toggleTheme } = useTheme();

    return(
        <section className={styles.layout}>
            <div className={styles.header}>
                <div onClick={toggleTheme}>
                    <ThemeToggle theme={theme} className={styles.toggle}/>
                </div>
            </div>
            <Outlet/>
        </section>
    )
}