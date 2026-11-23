import styles from './PayrollSectionComponent.module.css';
import Close from '../../assets/icons/Close.svg?react';
import Warning from '@mui/icons-material/WarningAmberOutlined';
import More from '@mui/icons-material/MoreVert';
import { ColorPickerPanel, EditableLabelComponent, IconButtonComponent, IconPickerPanel, ModalComponent, SliderComponent, InputGroupComponent, TextFieldComponent } from '../../components';
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
    const [tempValue, setTempValue] = useState(name);
    const [currentPercentage, setCurrentPercentage] = useState(percentage);
    const [currentColor, setCurrentColor] = useState(color);
    const [currentIcon, setCurrentIcon] = useState(icon);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setisEditModalOpen] = useState(false);
    const [expandedPanel, setExpandedPanel] = useState<'icon' | 'color' | null>(null);

    const { firebaseUser } = useAuth();

    const IconComponent = PAYROLL_ICONS[currentIcon ?? 'payments'];
    const MinLength = 5;
    const MaxLength = 25;

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

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isEditModalOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isEditModalOpen]);

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
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => togglePanel('icon')}>
                        <IconComponent/>
                    </IconButtonComponent>
                    <EditableLabelComponent value={currentName} minLength={MinLength} maxLength={MaxLength} className={styles.desktop} onChange={(newValue) => { handleNameChange(newValue); }}></EditableLabelComponent>
                    <span className={`${styles.sectionName} ${styles.mobile}`}>{currentName}</span>
                </div>
                <div className={styles.header__right}>
                    <span className={styles.percentage}>{currentPercentage}%</span>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => setIsModalOpen(true)} className={styles.desktop}>
                        <Close/>
                    </IconButtonComponent>
                    <IconButtonComponent variant="ghost" color='neutral' size='small' onClick={() => {setisEditModalOpen(true); setTempValue(currentName);}} className={styles.mobile}>
                        <More/>
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
            <ModalComponent
                isOpen={isEditModalOpen}
                closable
                title='Edit label'
                primaryButtonText='Confirm'
                onClose={() => setisEditModalOpen(false)}
                onConfirmation={() => {handleNameChange(tempValue); setisEditModalOpen(false)}}
                className={styles.modal}>
                <InputGroupComponent label='Label' helper='Maximum 25 characters'>
                    <TextFieldComponent placeholder='Type a new label' value={tempValue} minLength={MinLength} maxLength={MaxLength} onChange={(newValue) => setTempValue(newValue)}></TextFieldComponent>
                </InputGroupComponent>
            </ModalComponent>
        </div>
    )
}