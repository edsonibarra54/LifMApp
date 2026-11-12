import type { FieldValue } from 'firebase/firestore';
import { PAYROLL_ICONS } from '../constants';

export interface CreatePaysheetSection {
    userId: string;
    name: string;
    icon: keyof typeof PAYROLL_ICONS;
    color: string;
    percentage: number;
    createdAt: FieldValue;
}