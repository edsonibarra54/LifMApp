import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { db } from "../firebase";
import type { PaysheetSection, CreatePaysheetSection } from "../models";

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
            createdAt: data?.createdAt,
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

    async getAllByUserId(userId: string): Promise<PaysheetSection[]> {
        const q = query(
            collection(db, 'paysheet_sections'),
            where('userId', '==', userId),
            orderBy("createdAt", "asc")
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            userId: doc.data().userId,
            name: doc.data().name,
            icon: doc.data().icon,
            color: doc.data().color,
            percentage: doc.data().percentage,
            createdAt: doc.data().createdAt,
        }));
    }

    async create(section: CreatePaysheetSection): Promise<void> {
        const { ...data } = section;

        await addDoc(
            collection(db, 'paysheet_sections'),
            data
        );
    }

    async update() {}

    async delete(id: string): Promise<void> {
        try {
            const sectionRef = doc(db, "paysheet_sections", id);
            await deleteDoc(sectionRef);
        } catch (error) {
            console.error("Error deleting section:", error);
            throw error;
        }
    }
}