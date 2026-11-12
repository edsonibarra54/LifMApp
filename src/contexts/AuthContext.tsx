import { createContext, useEffect, useState, type ReactNode } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle, logout } from '../firebase';
import type { AppUser } from '../models/AppUser';
import { UserRepository } from '../repositories/UserRepository';

type AuthContextType = {
    user: AppUser | null;
    firebaseUser: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProps) {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);

    const userRepository = new UserRepository();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            async (firebaseUser) => {
                if (!firebaseUser) {
                    setFirebaseUser(null);
                    setUser(null);
                    setLoading(false);
                    return;
                }

                let profile = await userRepository.getById(firebaseUser.uid);

                if (!profile) {
                    await userRepository.create({
                        id: firebaseUser.uid,
                        email: firebaseUser.email ?? '',
                        username: firebaseUser.displayName ?? '',
                    });

                    profile = await userRepository.getById(firebaseUser.uid);
                }

                setFirebaseUser(firebaseUser);
                setUser(profile);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    async function signIn() {
        await loginWithGoogle();
    }

    async function signOut() {
        await logout();
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                firebaseUser,
                loading,
                isAuthenticated: !!user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}