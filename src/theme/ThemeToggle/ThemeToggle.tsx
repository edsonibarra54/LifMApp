import Light from '../../assets/icons/light_mode.svg?react';
import Dark from '../../assets/icons/dark_mode.svg?react';
import styles from './ThemeToggle.module.css';

type ThemeToggleProps = {
    theme: string;
    className?: string;
};

export function ThemeToggle({ theme, className }: ThemeToggleProps) {
    if (theme === 'light') {
        return <Dark className={`${styles.toggle} ${className ?? ''}`}/>;
    }
    return <Light className={`${styles.toggle} ${className ?? ''}`}/>;
}