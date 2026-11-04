import styles from './PayrollSectionComponent.module.css';
import Close from '../../assets/icons/Close.svg?react';
import { ColorPickerPanel, EditableLabelComponent, IconButtonComponent, IconPickerPanel, SliderComponent } from '../../components';
import { PAYROLL_ICONS, PAYROLL_COLORS } from '../../constants';
import { useState } from 'react';

type IconVariant = keyof typeof PAYROLL_ICONS;

type PayrollSectionComponentProps = {
    icon?: IconVariant,
    color?: string,
};

export function PayrollSectionComponent ({icon = "payments", color = "#ff0000"}: PayrollSectionComponentProps) {
    const [percentage, setPercentage] = useState(0);
    const [currentColor, setCurrentColor] = useState(color);
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [expandedPanel, setExpandedPanel] = useState<'icon' | 'color' | null>(null);

    const IconComponent = PAYROLL_ICONS[currentIcon ?? 'payments'];

    const togglePanel = ( panel: 'icon' | 'color' ) => {
        setExpandedPanel(
            expandedPanel === panel
                ? null
                : panel
        );
    };

    return (
        <div className={styles.payroll__section}>
            <div className={styles.section__header}>
                <div className={styles.header__left}>
                    <div className={styles.colorPicker} style={{ backgroundColor: currentColor }} onClick={() => togglePanel('color')}></div>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => togglePanel('icon')}>
                        <IconComponent/>
                    </IconButtonComponent>
                    <EditableLabelComponent value='Investment'></EditableLabelComponent>
                </div>
                <div className={styles.header__right}>
                    <span className={styles.percentage}>{percentage}%</span>
                    <IconButtonComponent variant="ghost" color='neutral' size='small'>
                        <Close/>
                    </IconButtonComponent>
                </div>
            </div>

            {expandedPanel === 'icon' && (
                <div className={styles.panel}>
                    <IconPickerPanel icons={PAYROLL_ICONS} value={currentIcon} onChange={(e) => setCurrentIcon(e)}/>
                </div>
            )}
            {expandedPanel === 'color' && (
                <div className={styles.panel}>
                    <ColorPickerPanel colors={PAYROLL_COLORS} value={currentColor} onChange={(e) => setCurrentColor(e)}/>
                </div>
            )}
            <SliderComponent step={1} onChange={setPercentage}/>
        </div>
    )
}