// ── DCC — Shared config ──────────────────────────────────────────
// Importé par toutes les pages via <script type="module">

export const FB_CONFIG = {
  apiKey:            "AIzaSyAPDwolV1l9jZHTMnWS3o1MKHR7qJItXlM",
  authDomain:        "duhamel-experiences.firebaseapp.com",
  projectId:         "duhamel-experiences",
  storageBucket:     "duhamel-experiences.firebasestorage.app",
  messagingSenderId: "625246869314",
  appId:             "1:625246869314:web:bb60d050bff212b5b3dadb"
};

// Comptes admin à créer au premier lancement
export const ADMIN_ACCOUNTS = [
  { email: "hugo.duhamel@dubernet.com",    displayName: "Hugo Duhamel",    password: "DCC@Hugo2025" },
  { email: "fanny.hernandez@dubernet.com", displayName: "Fanny Hernandez", password: "DCC@Fanny2025" },
  { email: "maxime.magre@dubernet.com",    displayName: "Maxime Magre",    password: "DCC@Maxime2025" },
];

export const ELEMENTS = ['B','Ca','Cu','Fe','K','Mg','Mn','Na','P','Zn'];

export const ELEM_UNITS = {
  'B':'ppm', 'Ca':'g/kg', 'Cu':'ppm', 'Fe':'ppm', 'K':'g/kg',
  'Mg':'g/kg', 'Mn':'ppm', 'Na':'ppm', 'P':'g/kg', 'Zn':'ppm'
};
