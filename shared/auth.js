// ── DCC — Auth utilities ─────────────────────────────────────────
import { FB_CONFIG, ADMIN_ACCOUNTS } from './config.js';
import { initializeApp }      from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut,
         createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword }
         from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp }
         from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const app  = initializeApp(FB_CONFIG);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// ── Redirect if not logged in ────────────────────────────────────
export function requireAuth(callback) {
  onAuthStateChanged(auth, async user => {
    if (!user) { window.location.href = '/login/'; return; }
    const snap = await getDoc(doc(db, 'users', user.uid));
    const profile = snap.exists()
      ? snap.data()
      : { role: 'client', displayName: user.displayName || user.email };
    callback(user, profile);
  });
}

// ── Bootstrap admin accounts on first launch ─────────────────────
export async function bootstrapAdmins() {
  try {
    const snap = await getDoc(doc(db, 'config', 'admins_created'));
    if (snap.exists() && snap.data().done) return;

    for (const acc of ADMIN_ACCOUNTS) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, acc.email, acc.password);
        await updateProfile(cred.user, { displayName: acc.displayName });
        await setDoc(doc(db, 'users', cred.user.uid), {
          uid: cred.user.uid, email: acc.email,
          displayName: acc.displayName, role: 'admin',
          createdAt: serverTimestamp()
        });
      } catch(e) { /* already exists */ }
    }
    // Déconnecter l'utilisateur créé pour ne pas interférer avec la session
    try { await signOut(auth); } catch {}
    await setDoc(doc(db, 'config', 'admins_created'), { done: true });
  } catch(e) { console.warn('Bootstrap:', e.message); }
}

// ── Logout ───────────────────────────────────────────────────────
export function setupLogout(btnId) {
  document.getElementById(btnId)?.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = '/login/';
  });
}

// ── Fill topbar user info ─────────────────────────────────────────
export function fillTopbarUser(profile) {
  const av   = document.getElementById('t-av');
  const name = document.getElementById('t-name');
  const role = document.getElementById('t-role');
  if (av)   av.textContent   = (profile.displayName || 'U')[0].toUpperCase();
  if (name) name.textContent = profile.displayName || profile.email || '—';
  if (role) role.textContent = profile.role || 'client';
}

// ── Toast ────────────────────────────────────────────────────────
let _tt;
export function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) return;
  const colors = { info:'#1e5fa8', success:'#2e7d52', error:'#c0392b', warn:'#c45c00' };
  el.style.background = colors[type] || colors.info;
  el.textContent = msg;
  el.classList.add('on');
  if (_tt) clearTimeout(_tt);
  _tt = setTimeout(() => el.classList.remove('on'), 3200);
}

// ── Modal helpers ─────────────────────────────────────────────────
export const showModal = id => document.getElementById(id)?.classList.add('on');
export const hideModal = id => document.getElementById(id)?.classList.remove('on');
