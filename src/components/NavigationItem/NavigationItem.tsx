import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router';
import type { SVGProps } from 'react';

type NavigationItemProps = {
    name: string;
    icon: React.FC<SVGProps<SVGSVGElement>>;
    path?: string;
    disabled?: boolean;
    to?: string;
};

export function NavigationItem({name, icon: Icon, disabled = false, to = '', path = ''}: NavigationItemProps) {
    return (
        <>
            <NavLink to={to} className={({ isActive }) => `${styles.navigation__item} ${isActive ? styles.current : ""} ${disabled ? styles.disabled : ''}`}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                    }
                }}
            >
                <Icon className={styles.item__img}/>
                <div className={styles.item__content} >
                    <span className={styles.item__name}>{ name }</span>
                    { !path ? (<span>Soon</span>) : null}
                </div>
            </NavLink>
        </>
    )
}