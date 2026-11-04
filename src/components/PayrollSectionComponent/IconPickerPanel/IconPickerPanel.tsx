import { ButtonComponent } from '../../ButtonComponent';
import styles from './IconPickerPanel.module.css';
    
type IconPickerPanelProps<T extends string> = {
    icons: Record<T, React.ElementType>,
    value?: T;
    onChange?: (value: T) => void;
};

export function IconPickerPanel<T extends string>({icons, value, onChange}: IconPickerPanelProps<T>) {
    return (
        <div className={styles.component}>
            {(Object.entries(icons) as [T, React.ElementType][]).map(
                ([key, Icon]) => (
                    <ButtonComponent variant={value === key ? 'outlined' : 'ghost'} color='neutral' key={key} onClick={() => onChange?.(key)}>
                        <Icon />
                    </ButtonComponent>
                )
            )}
        </div>
    );
}