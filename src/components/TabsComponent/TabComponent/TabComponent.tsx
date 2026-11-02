import { NavLink } from 'react-router';
import styles from './TabComponent.module.css';
import { type ReactNode } from 'react';

type TabComponentProps = {
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    to?: string;
};

export function TabComponent({children, className, disabled = false, to = '.'}: TabComponentProps) {
    if (disabled) {
      return <div className={`${styles.tab} ${styles.disabled}`}>{children}</div>;
    }
    return (
      <>
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.currentTab : ""} ${disabled ? styles.disabled : ''} ${className ?? ''}`
          }
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
        >
          {children}
        </NavLink>
      </>
    );
}