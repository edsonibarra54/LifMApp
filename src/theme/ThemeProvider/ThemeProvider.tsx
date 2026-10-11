import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProps = {
    children: ReactNode;
};

export function ThemeProvider({ children, }: ThemeProps) {
    const storedTheme = localStorage.getItem('theme');

    const [theme, setTheme] = useState<Theme>(
        storedTheme === 'dark' ? 'dark' : 'light'
    );

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            theme === 'dark'
        );
            localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(current =>
            current === 'light' ? 'dark' : 'light'
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }

    return context;
}