import Light from '../../assets/icons/light_mode.svg?react';
import Dark from '../../assets/icons/dark_mode.svg?react';

type ThemeToggleProps = {
    theme: string;
    className?: string;
};

export function ThemeToggle({ theme, className }: ThemeToggleProps) {
    if (theme === 'light') {
        return <Light className={`${className ?? ''}`}/>;
    }
    return <Dark className={`${className ?? ''}`}/>;
}