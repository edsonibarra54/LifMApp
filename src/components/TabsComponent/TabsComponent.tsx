import styles from './TabsComponent.module.css';
import { type ReactNode } from 'react';

type TabsComponentProps = {
    className?: string;
    children?: ReactNode;
};

export function TabsComponent({children, className}: TabsComponentProps) {
    return (
        <section className={`${className ?? ''} ${styles.container}`}>
            {children}
        </section>
    )
}