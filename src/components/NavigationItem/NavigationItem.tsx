import styles from './NavigationItem.module.css';
import { useNavigate } from "react-router";
import type { SVGProps } from 'react';

type NavigationItemProps = {
    name: string;
    icon: React.FC<SVGProps<SVGSVGElement>>;
    path?: string;
    disabled?: boolean;
};

export function NavigationItem({name, icon: Icon, path = ''}: NavigationItemProps) {
    let navigate = useNavigate();

    return (
        <button className={styles.navigation__item} onClick={() => navigate(path)}>
            <Icon className={styles.item__img}/>
            <div className={styles.item__content} >
                <span className={styles.item__name}>{ name }</span>
                { !path ? (<span>Soon</span>) : null}
            </div>
        </button>
    )
}