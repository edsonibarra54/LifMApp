import styles from './PayrollSectionComponent.module.css';
import Close from '../../assets/icons/Close.svg?react';
import Warning from '@mui/icons-material/WarningAmberOutlined';
import { ColorPickerPanel, EditableLabelComponent, IconButtonComponent, IconPickerPanel, ModalComponent, SliderComponent } from '../../components';
import { PAYROLL_ICONS, PAYROLL_COLORS } from '../../constants';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks';
import { PaysheetSectionRepository } from '../../repositories';

type IconVariant = keyof typeof PAYROLL_ICONS;

type PayrollSectionComponentProps = {
    id: string,
    name?: string,
    icon?: IconVariant,
    color?: string,
    percentage?: number,
    onRemove?: () => void;
};

const repository = new PaysheetSectionRepository();

export function PayrollSectionComponent ({id, name = 'New Section', icon = "payments", color = "#ff0000", percentage = 0, onRemove}: PayrollSectionComponentProps) {
    const [currentName, setCurrentName] = useState(name);
    const [currentPercentage, setCurrentPercentage] = useState(percentage);
    const [currentColor, setCurrentColor] = useState(color);
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expandedPanel, setExpandedPanel] = useState<'icon' | 'color' | null>(null);

    const { firebaseUser } = useAuth();

    const IconComponent = PAYROLL_ICONS[currentIcon ?? 'payments'];

    const togglePanel = ( panel: 'icon' | 'color' ) => {
        setExpandedPanel(
            expandedPanel === panel
                ? null
                : panel
        );
    };

    const handleColorChange = async (newColor: string) => {
        setCurrentColor(newColor);
        setExpandedPanel(null);

        await repository.update(id, {
            color: newColor
        });
    };

    const handleIconChange = async (newIcon: IconVariant) => {
        setCurrentIcon(newIcon);
        setExpandedPanel(null);

        await repository.update(id, {
            icon: newIcon
        });
    };

    const handleNameChange = async (newName: string) => {
        setCurrentName(newName);

        await repository.update(id, {
            name: newName
        });
    }

    const handlePercentageChange = async (newPercentage: number) => {
        await repository.update(id, {
            percentage: newPercentage
        });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            handlePercentageChange(currentPercentage);
        }, 700);

        return () => clearTimeout(timeout);
    }, [currentPercentage]);

    const removeSection = async () => {
        if (!firebaseUser) return;

        await repository.delete(id);

        onRemove?.();
        setIsModalOpen(false);
    }

    return (
        <div className={styles.payroll__section}>
            <div className={styles.section__header}>
                <div className={styles.header__left}>
                    <div className={styles.colorPicker} style={{ backgroundColor: currentColor }} onClick={() => togglePanel('color')}></div>
                    <div>{currentColor}</div>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => togglePanel('icon')}>
                        <IconComponent/>
                    </IconButtonComponent>
                    <EditableLabelComponent value={currentName} onChange={(newValue) => { handleNameChange(newValue); }}></EditableLabelComponent>
                </div>
                <div className={styles.header__right}>
                    <span className={styles.percentage}>{currentPercentage}%</span>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => setIsModalOpen(true)}>
                        <Close/>
                    </IconButtonComponent>
                </div>
            </div>

            {expandedPanel === 'icon' && (
                <div className={styles.panel}>
                    <IconPickerPanel icons={PAYROLL_ICONS} value={currentIcon} onChange={(e) => handleIconChange(e)}/>
                </div>
            )}
            {expandedPanel === 'color' && (
                <div className={styles.panel}>
                    <ColorPickerPanel colors={PAYROLL_COLORS} value={currentColor} onChange={(e) => handleColorChange(e)}/>
                </div>
            )}
            <SliderComponent step={1} value={currentPercentage} onChange={setCurrentPercentage}/>
            <ModalComponent
                isOpen={isModalOpen}
                closable
                variant='danger'
                title='Delete section?'
                message="New and all of its subdistributions will be permanently removed from your current distribution."
                secondaryButtonText='Cancel'
                primaryButtonText='Delete section'
                icon={<Warning/>}
                onClose={() => setIsModalOpen(false)}
                onConfirmation={removeSection}
                className={styles.modal}>
            </ModalComponent>
        </div>
    )
}