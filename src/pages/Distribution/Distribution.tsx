import styles from './Distribution.module.css';
import Add from '../../assets/icons/Add.svg?react';
import { ButtonComponent, PayrollSectionComponent } from '../../components'; 
import { PaysheetSectionRepository } from '../../repositories/PaysheetSectionRepository';
import { useAuth } from '../../hooks';
import { useEffect, useState } from 'react';
import type { PaysheetSection } from '../../models/PaysheetSection';

export function Distribution() {
    const { firebaseUser } = useAuth();
    const [sections, setSections] = useState<PaysheetSection[]>([]);

    useEffect(() => {
        const loadSections = async () => {
            if (!firebaseUser) return;

            const repository = new PaysheetSectionRepository();
            const data = await repository.getAllByUserId(firebaseUser.uid);

            setSections(data);
        }

        loadSections();
    }, [firebaseUser]);

    return (
        <section className={styles.view}>
            {sections.map(section => (
                <PayrollSectionComponent key={section.id} name={section.name} icon={section.icon} color={section.color} percentage={section.percentage}/>
            ))}
            <ButtonComponent variant='outlined' color='neutral' leftIcon={<Add/>} className={styles.addSection}>Add Section</ButtonComponent>
        </section>
    )
}