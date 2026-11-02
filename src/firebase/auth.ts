import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { auth } from './config';

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
        await signInWithRedirect(auth, provider);
        return;
    }
    
    await signInWithPopup(auth, provider);
}

export async function logout() {
    await signOut(auth);
}