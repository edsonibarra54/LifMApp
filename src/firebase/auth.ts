import { GoogleAuthProvider, signInWithPopup, signInWithCredential, signOut } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { auth } from './config';

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    try {
        if (Capacitor.isNativePlatform()) {
            const result = await FirebaseAuthentication.signInWithGoogle();
            const credential = GoogleAuthProvider.credential(result.credential?.idToken);

            await signInWithCredential(auth, credential);

            return;
        }

        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("LOGIN FAILED", error);
    }
}

export async function logout() {
    await signOut(auth);
}