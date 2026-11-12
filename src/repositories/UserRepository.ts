import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { AppUser } from "../models/AppUser";

export class UserRepository {
    async getById(id: string): Promise<AppUser | null> {
        const docRef = doc(db, 'users', id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return null;
        }

        return {
            id: snapshot.id,
            email: snapshot.data().email,
            username: snapshot.data().username,
        };
    }

    async create(user: AppUser): Promise<void> {
        const { id, ...data } = user;

        await setDoc(
            doc(db, 'users', id),
            data
        );
    }

    async update() {}

    async delete() {}
}