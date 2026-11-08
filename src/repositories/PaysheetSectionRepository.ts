import { addDoc, collection, doc, DocumentSnapshot, getDoc, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "../firebase";
import type { PaysheetSection } from "../models/PaysheetSection";

export class PaysheetSectionRepository {
    private mapToPaysheetSection(
        snapshot: QueryDocumentSnapshot | DocumentSnapshot
    ): PaysheetSection {
        const data = snapshot.data();

        return {
            id: snapshot.id,
            userId: data?.userId,
            name: data?.name,
            icon: data?.icon,
            color: data?.color,
            percentage: data?.percentage,
        };
    }

    async getById(id: string): Promise<PaysheetSection | null> {
        const docRef = doc(db, 'paysheet_sections', id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return null;
        }

        return this.mapToPaysheetSection(snapshot);
    }

    async getAll(): Promise<PaysheetSection[]> {
        const q = query(
            collection(db, 'paysheet_sections')
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc =>
            this.mapToPaysheetSection(doc)
        );
    }

    async getAllByUserId(userId: string): Promise<PaysheetSection[]> {
        const q = query(
            collection(db, 'paysheet_sections'),
            where('userId', '==', userId)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            userId: doc.data().userId,
            name: doc.data().name,
            icon: doc.data().icon,
            color: doc.data().color,
            percentage: doc.data().percentage,
        }));
    }

    async create(section: PaysheetSection): Promise<void> {
        const { id, ...data } = section;

        await addDoc(
            collection(db, 'paysheet_sections'),
            data
        );
    }

    async update() {}

    async delete() {}
}