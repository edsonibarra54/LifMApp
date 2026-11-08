import { PAYROLL_ICONS } from '../constants';

export interface PaysheetSection {
    id: string;
    userId: string;
    name: string;
    icon: keyof typeof PAYROLL_ICONS;
    color: string;
    percentage: number;
}