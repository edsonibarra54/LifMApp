import styles from './DrawerComponent.module.css';
import React, { useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router';

type TriggerProps = {
    children?: ReactNode;
}

function Trigger({children}: TriggerProps) {
    return <>{children}</>;
}

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

type DrawerComponentProps = {
    className?: string;
    children?: ReactNode;
    placement?: DrawerPlacement;
    open?: boolean;
}

export function DrawerComponent({ className, children, open = false, placement = 'left'}: DrawerComponentProps) {
    const [openState, setOpenState] = useState(open);
    const location = useLocation();

    useEffect(() => {
        setOpenState(false);
    }, [location.pathname]);

    let trigger;
    let content: React.ReactElement[] = [];

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        if (child.type === Trigger) {
            trigger = child;
        } else {
            content.push(child);
        }
    });

    return (
        <>
            <div onClick={() => setOpenState(true)}>{trigger}</div>
            <div className={`${styles.overlay} ${openState ? '' : styles.closed} ${styles[placement]}`} onClick={() => setOpenState(false)}>
                <section className={`${styles.drawer} ${styles[placement]} ${openState ? '' : styles.closed} ${className ?? ''}`} 
                    onClick={
                        (e) => {
                            const target = e.target as HTMLElement;

                            if (target.closest('a')) {
                                setOpenState(false);
                            } else {
                                e.stopPropagation()
                            }
                        }
                    }>
                    {content}
                </section>
            </div>
        </>
    )
}

DrawerComponent.Trigger = Trigger;