import styles from './Distribution.module.css';
import Add from '../../assets/icons/Add.svg?react';
import { ButtonComponent, PayrollSectionComponent } from '../../components'; 
import { PaysheetSectionRepository } from '../../repositories/PaysheetSectionRepository';
import { useAuth } from '../../hooks';
import { useEffect, useState } from 'react';
import { PAYROLL_COLORS } from '../../constants';
import type { PaysheetSection } from '../../models/PaysheetSection';
import { serverTimestamp } from 'firebase/firestore';

export function Distribution() {
    const { firebaseUser } = useAuth();
    const [sections, setSections] = useState<PaysheetSection[]>([]);

    const createSection = async () => {
        if (!firebaseUser) return;

        const repository = new PaysheetSectionRepository();

        repository.create({
            userId: firebaseUser.uid,
            name: `New section ${sections.length + 1}`,
            icon: "payments",
            color: PAYROLL_COLORS[sections.length % PAYROLL_COLORS.length],
            percentage: 0,
            createdAt: serverTimestamp(),
        });

        const data = await repository.getAllByUserId(firebaseUser.uid);
        setSections(data);
    }

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
            <ButtonComponent variant='outlined' color='neutral' leftIcon={<Add/>} className={styles.addSection} onClick={createSection}>Add Section</ButtonComponent>
        </section>
    )
}