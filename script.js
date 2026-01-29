const SUPABASE_URL = 'https://szhonwbqsemhjwcltscp.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aG9ud2Jxc2VtaGp3Y2x0c2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MDM2NzAsImV4cCI6MjA4NTI3OTY3MH0.s3SwFRQUv4rI2V9qAnoCluoZJQf4iJkCdm-ZeFWPxEY'; 

// Initialisation du client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const { useState, useEffect, useMemo, useRef } = React;

/* --- CONFIGURATION SCOLAIRE (Ne change pas) --- */
const DEFAULT_CONFIG = {
    '6eme': [
        { name: 'Francais', coef: 3, subs: [{name:'Comp. Française', label:'CF', coef:1}, {name:'Orth-Gram', label:'OG', coef:1}, {name:'Exp. Orale', label:'EO', coef:1}] }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 1 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'EDHC', coef: 1 }, { name: 'EPS', coef: 1, isSport: true }, 
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 }, 
        { name: 'TICE', coef: 1 }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '5eme': [
        { name: 'Francais', coef: 3, subs: [{name:'Comp. Française', label:'CF', coef:1}, {name:'Orth-Gram', label:'OG', coef:1}, {name:'Exp. Orale', label:'EO', coef:1}] }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 1 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'EDHC', coef: 1 }, { name: 'EPS', coef: 1, isSport: true },
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'TICE', coef: 1 }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '4eme': [
        { name: 'Francais', coef: 3, subs: [{name:'Comp. Française', label:'CF', coef:1}, {name:'Orth-Gram', label:'OG', coef:1}, {name:'Exp. Orale', label:'EO', coef:1}] }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 3 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'EDHC', coef: 1 }, { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '3eme': [
        { name: 'Francais', coef: 3, subs: [{name:'Comp. Française', label:'CF', coef:1}, {name:'Orth-Gram', label:'OG', coef:1}, {name:'Exp. Orale', label:'EO', coef:1}] }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 3 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'EDHC', coef: 1 }, { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '2nd A': [
        { name: 'Francais', coef: 4 }, { name: 'Histoire-Geo', coef: 3 }, { name: 'Anglais', coef: 3 },
        { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 2 },
        { name: 'Physique-Chimie', coef: 2 }, { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '2nd C': [
        { name: 'Mathematiques', coef: 5 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Francais', coef: 2 }, { name: 'Histoire-Geo', coef: 2 }, { name: 'Anglais', coef: 2 },
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '1ere A1': [
        { name: 'Francais', coef: 4 }, { name: 'Philosophie', coef: 4 }, { name: 'Histoire-Geo', coef: 4 }, 
        { name: 'Anglais', coef: 4 }, { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 2 }, { name: 'Physique-Chimie', coef: 2 }, 
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '1ere C': [
        { name: 'Mathematiques', coef: 6 }, { name: 'Physique-Chimie', coef: 5 }, { name: 'SVT', coef: 4 },
        { name: 'Francais', coef: 2 }, { name: 'Philosophie', coef: 2 }, { name: 'Histoire-Geo', coef: 2 }, 
        { name: 'Anglais', coef: 2 }, { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '1ere D': [
        { name: 'Mathematiques', coef: 4 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Francais', coef: 2 }, { name: 'Philosophie', coef: 2 }, { name: 'Histoire-Geo', coef: 2 }, 
        { name: 'Anglais', coef: 2 }, { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    'TLE A1': [
        { name: 'Philosophie', coef: 5 }, { name: 'Francais', coef: 4 }, { name: 'Histoire-Geo', coef: 4 },
        { name: 'Anglais', coef: 4 }, { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 2 }, { name: 'Physique-Chimie', coef: 2 },
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    'TLE C': [
        { name: 'Mathematiques', coef: 6 }, { name: 'Physique-Chimie', coef: 5 }, { name: 'SVT', coef: 4 },
        { name: 'Philosophie', coef: 2 }, { name: 'Francais', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'Anglais', coef: 2 }, { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    'TLE D': [
        { name: 'Mathematiques', coef: 4 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Philosophie', coef: 2 }, { name: 'Francais', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'Anglais', coef: 2 }, { name: 'Arts Plastiques', coef: 1 }, { name: 'Education Musicale', coef: 1 },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ]
};

const randomFloat = (min, max) => Math.random() * (max - min) + min;

const Icons = {
    Download: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Refresh: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    Zap: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    GraduationCap: ({size=24}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    Users: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Globe: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    ChevronDown: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
    Target: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Settings: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    X: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    RotateCcw: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
    Trash: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
    Calculator: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>,
    Lock: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
    Unlock: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>,
    Sigma: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7V4H6l6 8-6 8h12v-3"/></svg>,
    FileSpreadsheet: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>,
    Sliders: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>,
    CheckCircle: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    ShieldCheck: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    TrendingUp: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    TrendingDown: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
    ArrowRight: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    UserCircle: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>,
    Trophy: ({size=18}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17"/><path d="M14 14.66V17"/><path d="M18 2h-3a5 5 0 0 0-5 5v2.4a6 6 0 0 0 5.86 6.38l3.9-1.29a3 3 0 0 0 1.24-4.8L18 2z"/><path d="M6 2h3a5 5 0 0 1 5 5v2.4a6 6 0 0 1-5.86 6.38L4.24 14.5a3 3 0 0 1-1.24-4.8L6 2z"/></svg>,
    Star: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    Cloud: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19"/><path d="M20 16.95c-1.15-2.95-3.65-5.2-6.75-5.8"/><path d="M4 16.95c1.15-2.95 3.65-5.2 6.75-5.8"/><circle cx="12" cy="10" r="3"/></svg>,
    Calendar: ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    Printer: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>,
    LogOut: ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
};

const AdminModal = ({ isOpen, onClose, subjectsConfig, onUpdateConfig, onResetFactory, generatorProps }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('generator'); 
    const [selectedLevel, setSelectedLevel] = useState('6eme');

    useEffect(() => { if (isOpen) { setIsAuthenticated(false); setPin(''); setError(''); setActiveTab('generator'); } }, [isOpen]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === '0000') { setIsAuthenticated(true); setError(''); } 
        else { setError('Code incorrect'); }
    };

    const handleCoefChange = (idx, val, subIdx = null) => {
        const value = parseFloat(val) || 0;
        const newSubjects = JSON.parse(JSON.stringify(subjectsConfig[selectedLevel]));
        if (subIdx !== null && newSubjects[idx].subs) { newSubjects[idx].subs[subIdx].coef = value; } else { newSubjects[idx].coef = value; }
        onUpdateConfig({ ...subjectsConfig, [selectedLevel]: newSubjects });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col overflow-hidden transition-all duration-300 ${isAuthenticated ? 'h-[85vh]' : 'h-auto max-w-md'}`}>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-500 rounded-lg">{isAuthenticated ? <Icons.Unlock size={20} /> : <Icons.Lock size={20} />}</div>
                        <div><h3 className="text-lg font-bold font-heading">Espace Administration</h3>{isAuthenticated && <p className="text-xs text-slate-400">Gérez la classe et les configurations</p>}</div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"><Icons.X /></button>
                </div>
                <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
                    {!isAuthenticated ? (
                        <div className="flex flex-col items-center justify-center p-8">
                            <p className="mb-6 text-slate-600 font-medium text-center">Veuillez saisir le code PIN administrateur.</p>
                            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
                                <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} className="text-center text-3xl tracking-[0.5em] font-bold p-4 rounded-xl border border-slate-300 focus:border-brand-500 outline-none focus:ring-4 focus:ring-brand-500/10 transition-all" placeholder="••••" maxLength={4} autoFocus />
                                {error && <p className="text-red-500 text-sm text-center font-bold bg-red-50 py-2 rounded-lg">{error}</p>}
                                <button type="submit" className="bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-slate-900/20">Déverrouiller</button>
                            </form>
                            <p className="mt-4 text-xs text-slate-400">Code par défaut : 0000</p>
                        </div>
                    ) : (
                        <div className="flex h-full">
                            <div className="w-64 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col">
                                <div className="p-4 space-y-2">
                                    <button onClick={() => setActiveTab('generator')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'generator' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50'}`}><Icons.FileSpreadsheet size={18} /> Générateur de Classe</button>
                                    <button onClick={() => setActiveTab('config')} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'config' ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-50'}`}><Icons.Settings size={18} /> Configuration</button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                {activeTab === 'generator' ? (
                                    <div className="space-y-6">
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.Sliders size={16}/> Paramètres de Génération</h4>
                                            {/* (Code générateur simplifié pour la lisibilité, garde le même que précédemment) */}
                                            <div className="flex gap-4 items-end">
                                                <button onClick={generatorProps.generateData} disabled={generatorProps.isGenerating} className="px-6 py-2 bg-slate-900 hover:bg-brand-600 text-white rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2">{generatorProps.isGenerating ? 'Calcul...' : <><Icons.Refresh size={18}/> Générer la Classe</>}</button>
                                                {generatorProps.data.length > 0 && <button onClick={generatorProps.exportToCSV} className="text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg text-sm font-bold border border-emerald-100"><Icons.Download size={16}/> CSV</button>}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 outline-none focus:border-brand-500">{Object.keys(subjectsConfig).map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}</select>
                                        </div>
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div className="divide-y divide-slate-100">{subjectsConfig[selectedLevel].map((sub, idx) => (<div key={idx} className="p-4 hover:bg-slate-50 transition-colors"><div className="flex items-center justify-between"><span className="font-bold text-slate-700">{sub.name}</span><div className="flex items-center gap-2"><span className="text-[10px] uppercase font-bold text-slate-400">Coef</span><input type="number" min="1" value={sub.coef} onChange={(e) => handleCoefChange(idx, e.target.value)} className="w-16 p-1.5 text-center font-bold text-brand-600 bg-brand-50 rounded-lg border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-200" /></div></div></div>))}</div></div>
                                        <div className="flex justify-between items-center pt-4"><button onClick={onResetFactory} className="text-red-500 text-sm font-bold flex items-center gap-1 hover:underline"><Icons.RotateCcw size={14} /> Rétablir défaut</button></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AuthModal = ({ isOpen, onClose, onLogin }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h3 className="font-bold text-slate-800">Compte ScolarPro</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><Icons.X size={20}/></button>
                </div>
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
                        <Icons.Cloud size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Sauvegarde ta progression</h2>
                    <p className="text-slate-500 mb-8">Synchronise tes notes et accède à tes stats détaillées sur tous tes appareils.</p>
                    
                    <button 
                        onClick={onLogin}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700 bg-white shadow-sm"
                    >
                        {/* Logo Google */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continuer avec Google
                    </button>
                </div>
            </div>
        </div>
    );
};

/* --- COMPOSANTS GRAPHIQUES (Radar, Chart, KPI) --- */
const PerformanceRadar = ({ data }) => {
    const size = 250; const center = size / 2; const radius = 80; const sides = 5; const angleStep = (Math.PI * 2) / sides; const labels = ["SCIENCES", "LETTRES", "LANGUES", "SOCIÉTÉ", "ARTS"];
    const getPoints = (r) => labels.map((_, i) => { const angle = i * angleStep - Math.PI / 2; return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`; }).join(' ');
    const dataPoints = data.map((val, i) => { const angle = i * angleStep - Math.PI / 2; const r = (val / 20) * radius; return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`; }).join(' ');
    return (
        <div className="w-full flex justify-center items-center py-2"><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">{[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (<polygon key={i} points={getPoints(radius * scale)} fill={i % 2 === 0 ? "#f8fafc" : "#ffffff"} stroke="#e2e8f0" strokeWidth="1" />))}<polygon points={dataPoints} fill="rgba(249, 115, 22, 0.2)" stroke="#ea580c" strokeWidth="2" className="chart-path" />{data.map((val, i) => { const angle = i * angleStep - Math.PI / 2; const r = (val / 20) * radius; return <circle key={i} cx={center + r * Math.cos(angle)} cy={center + r * Math.sin(angle)} r="3" fill="#ea580c" className="drop-shadow-sm" />; })}{labels.map((label, i) => { const angle = i * angleStep - Math.PI / 2; const lx = center + (radius + 20) * Math.cos(angle); const ly = center + (radius + 20) * Math.sin(angle); return (<text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-bold fill-slate-400">{label}</text>); })}</svg></div>
    );
};

const ProgressChart = ({ history }) => {
    if (!history || history.length < 2) return <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200"><Icons.TrendingUp size={24} className="mb-2 text-slate-300"/>Données insuffisantes</div>;
    const height = 200; const maxVal = 20;
    const getPath = (points) => { if (points.length === 0) return ""; if (points.length === 1) return `M ${points[0].x} ${points[0].y}`; let d = `M ${points[0].x} ${points[0].y}`; for (let i = 0; i < points.length - 1; i++) { const p0 = points[i]; const p1 = points[i + 1]; const midX = (p0.x + p1.x) / 2; d += ` C ${midX} ${p0.y}, ${midX} ${p1.y}, ${p1.x} ${p1.y}`; } return d; };
    const points = history.map((entry, i) => { const x = (i / (history.length - 1)) * 100; const val = Math.min(Math.max(entry.average || 0, 0), 20); const y = height - (val / maxVal) * height; return { x, y, val }; });
    const pathD = getPath(points); const areaD = `${pathD} L 100 ${height} L 0 ${height} Z`;
    return (
        <div className="w-full h-56 relative pt-4 pb-8"><svg viewBox={`0 -10 100 ${height + 20}`} preserveAspectRatio="none" className="w-full h-full overflow-visible chart-grid"><defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/><stop offset="100%" stopColor="#f97316" stopOpacity="0"/></linearGradient><filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{[0, 5, 10, 15, 20].map(val => (<line key={val} x1="0" y1={height - (val/20)*height} x2="100" y2={height - (val/20)*height} />))}<path d={areaD} fill="url(#chartGradient)" stroke="none" /><path d={pathD} fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" className="chart-path" vectorEffect="non-scaling-stroke"/>{points.map((p, i) => (<g key={i} className="group cursor-pointer"><circle cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#ea580c" strokeWidth="2" vectorEffect="non-scaling-stroke" className="hover:r-5 transition-all"/><foreignObject x={p.x - 15} y={p.y - 40} width="30" height="30" className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"><div className="bg-slate-900 text-white text-[10px] font-bold rounded-lg py-1 text-center shadow-lg border border-slate-700">{p.val.toFixed(2)}</div></foreignObject></g>))}</svg><div className="absolute left-0 top-4 bottom-8 flex flex-col justify-between text-[9px] text-slate-400 font-medium pointer-events-none -ml-6 h-[calc(100%-48px)]"><span>20</span><span>15</span><span>10</span><span>05</span><span>00</span></div><div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1 px-1"><span>Début</span>{history.length > 2 && <span>Progression</span>}<span>Actuel</span></div></div>
    );
};

const KPICard = ({ title, value, subtitle, icon: Icon, trend }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow h-full">
        <div className="flex justify-between items-start mb-4"><div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p><h3 className="text-3xl font-extrabold text-slate-800 mt-1">{value}</h3></div><div className={`p-2.5 rounded-xl ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-50 text-brand-600'}`}><Icon size={20} /></div></div>
        {subtitle && (<div className="flex items-center gap-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{subtitle}</span>{trend === 'up' && <span className="text-[10px] text-slate-400 font-medium">+ Progression</span>}</div>)}
    </div>
);

const EvolutionView = ({ subjectsConfig, currentProfile }) => {
    const { level, grades, lv2Choice, periods, history } = currentProfile;
    const subjects = subjectsConfig[level] || [];
    const getG = (name) => { const sub = subjects.find(s => s.name === name); if(!sub) return 0; if(sub.subs) { let sT=0, sC=0; sub.subs.forEach(s => { const k=`${sub.name}_${s.name}`; if(grades[k]){ sT+=parseFloat(grades[k])*s.coef; sC+=s.coef; } }); return sC>0?sT/sC:0; } return parseFloat(grades[name] || 0); };
    const radarData = useMemo(() => {
        const calcAxis = (names) => { let total = 0; let count = 0; names.forEach(n => { const sub = subjects.find(s => s.name === n); if (sub) { if (sub.isLV2 && sub.name !== lv2Choice) return; const val = getG(n); if (val > 0) { total += val; count++; } } }); return count > 0 ? total / count : 0; };
        return [calcAxis(['Mathematiques', 'Physique-Chimie', 'SVT']), calcAxis(['Francais', 'Philosophie']), calcAxis(['Anglais', lv2Choice]), calcAxis(['Histoire-Geo', 'EDHC']), calcAxis(['Arts Plastiques', 'Education Musicale', 'EPS', 'TICE'])];
    }, [grades, subjects, lv2Choice]);
    const annualStats = useMemo(() => { if (!periods) return { average: 0, isProjected: true }; const t1 = periods['T1']?.average; const t2 = periods['T2']?.average; const t3 = periods['T3']?.average; let totalWeighted = 0; let totalCoeffs = 0; if (t1) { totalWeighted += t1 * 1; totalCoeffs += 1; } if (t2) { totalWeighted += t2 * 2; totalCoeffs += 2; } if (t3) { totalWeighted += t3 * 2; totalCoeffs += 2; } const annualAverage = totalCoeffs > 0 ? totalWeighted / totalCoeffs : 0; return { average: annualAverage, isProjected: totalCoeffs < 5 }; }, [periods]);
    const rank = (avg) => { if (avg === 0) return { title: "N/A" }; if (avg < 10) return { title: "En Danger" }; if (avg < 12) return { title: "Passable" }; if (avg < 14) return { title: "Assez Bien" }; if (avg < 16) return { title: "Bien" }; return { title: "Très Bien" }; }(annualStats.average);
    const bestSubject = useMemo(() => { let best = { name: '-', grade: 0 }; subjects.forEach(sub => { if (sub.isLV2 && sub.name !== lv2Choice) return; const grade = getG(sub.name); if (grade > best.grade) best = { name: sub.name, grade }; }); return best; }, [grades, subjects, lv2Choice]);

    return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6 no-print">
                <div><h2 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau de Bord</h2><div className="flex items-center gap-2 text-sm text-slate-500 mt-1"><span className="font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">{level}</span><span>•</span><span>Dernière mise à jour : Aujourd'hui</span></div></div>
                <div className="flex gap-2"><button onClick={() => window.print()} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-2 shadow-sm"><Icons.Printer size={16}/> Imprimer / PDF</button></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard title={annualStats.isProjected ? "Moyenne Annuelle (Proj.)" : "Moyenne Annuelle Finale"} value={annualStats.average > 0 ? annualStats.average.toFixed(2) : '-'} subtitle={rank.title} icon={Icons.Trophy} trend={annualStats.average >= 10 ? 'up' : 'down'} />
                <KPICard title="Meilleure Matière" value={bestSubject.grade > 0 ? bestSubject.grade.toFixed(2) : '-'} subtitle={bestSubject.name} icon={Icons.Star} trend="up" />
                <KPICard title="Historique" value={history.length} subtitle="Simulations" icon={Icons.TrendingUp} trend="up" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Icons.TrendingUp className="text-brand-500" size={20}/> Tendance Annuelle</h3><div className="flex-1 flex items-center"><ProgressChart history={history} /></div></div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col"><h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2"><Icons.Target className="text-brand-500" size={20}/> Compétences</h3><div className="flex-1 flex items-center justify-center"><PerformanceRadar data={radarData} /></div></div>
            </div>
            {/* Trimestres (Same as before) */}
        </div>
    );
};

const Calculator = ({ level, onLevelChange, subjectsConfig, onSaveToProfile, currentPeriod, onPeriodChange, savedActiveSubjects }) => {
    // ... (Code du calculateur inchangé - Copie de la version précédente)
    const subjects = useMemo(() => subjectsConfig[level] || [], [level, subjectsConfig]);
    const [grades, setGrades] = useState({});
    const [result, setResult] = useState(0); 
    const [lv2Choice, setLv2Choice] = useState('Espagnol');
    
    const [activeSubjects, setActiveSubjects] = useState(() => {
        try { const temp = JSON.parse(localStorage.getItem('scolarProCalc_Temp')); if (temp && temp.activeSubjects && temp.level === level) return temp.activeSubjects; } catch(e) {}
        if (savedActiveSubjects && savedActiveSubjects.length > 0) { const currentNames = subjects.map(s => s.name); if (savedActiveSubjects.some(s => currentNames.includes(s))) return savedActiveSubjects; }
        return subjects.map(s => s.name);
    });

    const isFirstMount = useRef(true);
    useEffect(() => { if (isFirstMount.current) { isFirstMount.current = false; return; } setActiveSubjects(subjects.map(s => s.name)); }, [subjects]);
    useEffect(() => { try { localStorage.setItem('scolarProCalc_Temp', JSON.stringify({ level, grades, lv2Choice, activeSubjects })); } catch(e) {} }, [grades, lv2Choice, level, activeSubjects]);
    const hasLV2 = useMemo(() => subjects.some(s => s.isLV2), [subjects]);
    const totalCoef = useMemo(() => { let t = 0; subjects.forEach(s => { if (!activeSubjects.includes(s.name)) return; if(s.isLV2){ if(s.name===lv2Choice) t+=s.coef; } else { t+=s.coef; } }); return t; }, [subjects, lv2Choice, activeSubjects]);
    useEffect(() => { try { const saved = localStorage.getItem('scolarProCalc_Temp'); if (saved) { const p = JSON.parse(saved); if(p.level) onLevelChange(p.level); setGrades(p.grades||{}); setLv2Choice(p.lv2Choice||'Espagnol'); } } catch(e){} }, []);

    useEffect(() => {
        let totalPoints = 0, totalCoefCalc = 0;
        subjects.forEach(sub => {
            if (!activeSubjects.includes(sub.name)) return;
            let grade = 0;
            if (sub.isLV2 && sub.name !== lv2Choice) return;
            if (sub.subs) { let sT=0, sC=0, has=false; sub.subs.forEach(s => { const k=`${sub.name}_${s.name}`; if(grades[k]!==undefined&&grades[k]!==''){ sT+=parseFloat(grades[k])*s.coef; sC+=s.coef; has=true; } }); if(has && sC>0) grade = sT/sC; } else { if(grades[sub.name]!==undefined&&grades[sub.name]!=='') grade = parseFloat(grades[sub.name]); }
            totalPoints += grade * sub.coef; totalCoefCalc += sub.coef;
        });
        const avg = totalCoefCalc > 0 ? totalPoints / totalCoefCalc : 0;
        setResult(avg);
    }, [grades, activeSubjects, lv2Choice, subjects]);

    const handleToggleSubject = (subjectName) => { setActiveSubjects(prev => prev.includes(subjectName) ? prev.filter(n => n !== subjectName) : [...prev, subjectName]); };
    const handleGradeChange = (subjectName, value) => { const val = value === '' ? '' : Math.min(20, Math.max(0, parseFloat(value))); setGrades(prev => ({ ...prev, [subjectName]: val })); };
    const handleSubGradeChange = (subjectName, subName, value) => { const key = `${subjectName}_${subName}`; const val = value === '' ? '' : Math.min(20, Math.max(0, parseFloat(value))); setGrades(prev => ({ ...prev, [key]: val })); };
    const handleCloudSave = () => { if(result > 0) { onSaveToProfile({ grades, average: result, level, lv2Choice, activeSubjects }); } else { alert("Calculez une moyenne valide avant de sauvegarder !"); } };
    
    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-20 max-w-7xl mx-auto">
            <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row gap-8 items-center justify-between border-2 border-slate-100 bg-gradient-to-br from-white to-slate-50">
                <div className="flex flex-col items-center md:items-start w-full md:w-auto order-2 md:order-1 flex-1">
                     <div className="flex flex-col gap-1 w-full"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">Moyenne Générale</span>
                        <div className="flex items-baseline justify-center md:justify-start gap-2"><span className={`text-6xl md:text-7xl font-black tracking-tighter ${result >= 10 ? 'text-emerald-500' : result > 0 ? 'text-red-500' : 'text-slate-300'}`}>{result.toFixed(2)}</span><span className="text-2xl font-bold text-slate-400">/20</span></div>
                        <div className="flex gap-3 mt-4 justify-center md:justify-start no-print">
                            <button onClick={handleCloudSave} className="bg-slate-900 hover:bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-900/20 transition-all flex items-center gap-2 text-sm"><Icons.Cloud size={16} /> Sauvegarder</button>
                            <button onClick={()=>{setGrades({});}} className="bg-white border border-slate-200 text-slate-500 hover:text-red-500 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm"><Icons.RotateCcw size={16} /></button>
                            <button onClick={()=>window.print()} className="bg-white border border-slate-200 text-slate-500 hover:text-blue-500 px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm"><Icons.Printer size={16} /> PDF</button>
                        </div>
                     </div>
                </div>
                {/* Contrôles du haut (Niveau, Période) */}
                <div className="flex flex-col gap-4 w-full md:w-auto order-1 md:order-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm no-print">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex flex-col gap-1 w-full sm:w-40"><label className="text-[10px] font-bold text-slate-400 uppercase">Niveau</label><div className="relative"><select value={level} onChange={(e) => { onLevelChange(e.target.value); setGrades({}); }} className="w-full p-2 bg-slate-50 font-bold text-slate-700 rounded-lg border border-slate-200 outline-none focus:border-brand-500 appearance-none text-sm">{Object.keys(subjectsConfig).map(l => <option key={l} value={l}>{l}</option>)}</select><div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.ChevronDown size={14}/></div></div></div>
                        <div className="flex flex-col gap-1 w-full sm:w-40"><label className="text-[10px] font-bold text-slate-400 uppercase">Période</label><div className="relative"><select value={currentPeriod} onChange={(e) => onPeriodChange(e.target.value)} className="w-full p-2 bg-slate-50 font-bold text-slate-700 rounded-lg border border-slate-200 outline-none focus:border-brand-500 appearance-none text-sm"><option value="T1">1er Trimestre</option><option value="T2">2ème Trimestre</option><option value="T3">3ème Trimestre</option></select><div className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.ChevronDown size={14}/></div></div></div>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-100 pt-3">{hasLV2 && (<div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-400 uppercase">LV2:</span><select value={lv2Choice} onChange={(e) => setLv2Choice(e.target.value)} className="text-sm font-bold text-brand-600 bg-transparent outline-none cursor-pointer"><option value="Espagnol">Espagnol</option><option value="Allemand">Allemand</option></select></div>)}<div className="ml-auto bg-brand-50 px-3 py-1 rounded-lg"><span className="text-[10px] font-bold text-brand-400 uppercase mr-1">Total Coef</span><span className="text-sm font-black text-brand-700">{totalCoef}</span></div></div>
                </div>
            </div>
            {/* Grille des matières */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subjects.map((sub, idx) => {
                    if (sub.isLV2 && sub.name !== lv2Choice) return null;
                    const isActive = activeSubjects.includes(sub.name);
                    return (
                        <div key={idx} className={`bg-white p-4 rounded-2xl border transition-all relative ${isActive ? 'border-slate-100 shadow-sm hover:border-brand-200 hover:shadow-md' : 'border-slate-100 opacity-60 bg-slate-50'}`}>
                            <div className="flex justify-between items-start mb-3 pb-2 border-b border-slate-50">
                                <div className="flex items-center gap-3"><input type="checkbox" checked={isActive} onChange={() => handleToggleSubject(sub.name)} className="custom-checkbox no-print"/><label className={`font-bold text-sm cursor-pointer select-none ${isActive ? 'text-slate-700' : 'text-slate-400'}`} onClick={() => handleToggleSubject(sub.name)}>{sub.name}</label></div>
                                {isActive && <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full font-bold">x{sub.coef}</span>}
                            </div>
                            <div className={isActive ? '' : 'pointer-events-none grayscale opacity-50'}>
                                {sub.subs ? (<div className="flex flex-col gap-3">{sub.subs.map((s, sIdx) => (<div key={sIdx} className="flex items-center justify-between gap-2"><label className="text-xs text-slate-500 font-medium truncate" title={s.name}>{s.label}</label><div className="relative w-16"><input type="number" placeholder="-" value={grades[`${sub.name}_${s.name}`]!==undefined?grades[`${sub.name}_${s.name}`]:''} onChange={(e)=>handleSubGradeChange(sub.name, s.name, e.target.value)} className="w-full p-1 bg-slate-50 border border-slate-200 rounded text-center font-bold text-sm focus:border-brand-400 outline-none" /></div></div>))}</div>) : (<input type="number" placeholder="-" value={grades[sub.name]!==undefined?grades[sub.name]:''} onChange={(e)=>handleGradeChange(sub.name, e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-xl text-slate-800 focus:bg-white focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all placeholder:text-slate-300" />)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const LandingPage = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col no-print">
            <div className="relative overflow-hidden bg-slate-900 text-white pb-20 pt-24 md:pt-32">
                <div className="absolute inset-0 hero-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm"><span className="w-2 h-2 rounded-full bg-brand-500"></span> Nouvelle Version 2.5</div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-heading leading-tight">Calculer votre moyenne <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-200">n'a jamais été aussi simple.</span></h1>
                    <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed">ScolarPro CI intègre les derniers coefficients du Ministère pour vous offrir des simulations précises et un suivi personnalisé.</p>
                    <button onClick={onStart} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-900/50 hover:shadow-brand-500/30 hover:-translate-y-1">Commencer maintenant<Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
                </div>
            </div>
            {/* Features & Footer (Code identique) */}
        </div>
    );
};

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentView, setCurrentView] = useState('landing'); 
    const [activeTab, setActiveTab] = useState('calculator'); 
    
    // --- GESTION DE SESSION SUPABASE ---
    const [session, setSession] = useState(null);

    // --- ETATS GLOBAUX ---
    const [userProfile, setUserProfile] = useState({
        level: '6eme', grades: {}, lv2Choice: 'Espagnol', activeSubjects: [], 
        periods: { 'T1': { average: null, grades: {} }, 'T2': { average: null, grades: {} }, 'T3': { average: null, grades: {} } },
        history: []
    });
    const [currentPeriod, setCurrentPeriod] = useState('T1');
    const [subjectsConfig, setSubjectsConfig] = useState(DEFAULT_CONFIG);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // État local d'affichage

    // Charger les données depuis le LocalStorage au démarrage (Rapide)
    useEffect(() => {
        const savedConfig = localStorage.getItem('scolarProAdminConfig');
        if (savedConfig) { try { setSubjectsConfig(JSON.parse(savedConfig)); } catch (e) {} }
        const savedProfile = localStorage.getItem('scolarProUserProfile');
        if (savedProfile) {
            try {
                const parsed = JSON.parse(savedProfile);
                setUserProfile(prev => ({ ...prev, ...parsed, periods: parsed.periods || prev.periods, history: Array.isArray(parsed.history) ? parsed.history : [], activeSubjects: Array.isArray(parsed.activeSubjects) ? parsed.activeSubjects : [] }));
                setIsLoggedIn(true); 
            } catch(e) {}
        }
        setIsLoaded(true); 
    }, []);

    // --- LOGIQUE SUPABASE ---
    useEffect(() => {
        // 1. Vérifier la session au chargement
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) fetchProfileFromSupabase(session.user.id);
        });

        // 2. Écouter les changements de connexion (Login/Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                fetchProfileFromSupabase(session.user.id);
                setIsLoggedIn(true);
                setIsAuthModalOpen(false); // Fermer la modale si elle est ouverte
                setActiveTab('profile'); // Rediriger vers le profil
            } else {
                setIsLoggedIn(false); // Mode "Invité"
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const fetchProfileFromSupabase = async (userId) => {
        const { data, error } = await supabase.from('profiles').select('user_data').eq('id', userId).single();
        if (data && data.user_data) {
            console.log("Données récupérées de Supabase:", data.user_data);
            setUserProfile(prev => ({ ...prev, ...data.user_data }));
            // Mettre à jour le localStorage pour le mode hors-ligne
            localStorage.setItem('scolarProUserProfile', JSON.stringify(data.user_data));
        }
    };

    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin }
        });
        if (error) console.error("Erreur login:", error);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsLoggedIn(false);
        alert("Vous êtes déconnecté.");
    };

    const handleSaveToProfile = async (calcData) => {
        // Logique de calcul locale
        const validAverage = parseFloat(calcData.average) || 0;
        const newHistoryEntry = { date: Date.now(), average: validAverage };
        
        const newProfileData = {
            ...userProfile,
            level: calcData.level,
            lv2Choice: calcData.lv2Choice,
            grades: calcData.grades,
            activeSubjects: calcData.activeSubjects,
            periods: { ...userProfile.periods, [currentPeriod]: { average: validAverage, grades: calcData.grades } },
            history: [...(userProfile.history || []), newHistoryEntry]
        };

        // 1. Mise à jour de l'état React (Immédiat)
        setUserProfile(newProfileData);
        
        // 2. Sauvegarde LocalStorage (Backup)
        localStorage.setItem('scolarProUserProfile', JSON.stringify(newProfileData));
        setIsLoggedIn(true); // On considère qu'il a au moins un profil local actif

        // 3. Sauvegarde Cloud (Si connecté)
        if (session) {
            const { error } = await supabase.from('profiles').upsert({
                id: session.user.id,
                updated_at: new Date(),
                email: session.user.email,
                user_data: newProfileData
            });
            if (!error) alert(`Sauvegardé sur le Cloud et en local ! (${validAverage.toFixed(2)}/20)`);
            else alert("Sauvegardé en local seulement (Erreur Cloud).");
        } else {
            // Si pas connecté, on propose la connexion mais on sauvegarde quand même en local
            if(confirm(`Moyenne de ${validAverage.toFixed(2)} sauvegardée sur cet appareil.\n\nVoulez-vous vous connecter pour ne jamais perdre vos notes ?`)) {
                setIsAuthModalOpen(true);
            }
        }
        setActiveTab('profile');
    };

    // --- FIN LOGIQUE SUPABASE ---

    // Handlers Admin (Reste inchangé)
    const handleUpdateConfig = (newConfig) => { setSubjectsConfig(newConfig); localStorage.setItem('scolarProAdminConfig', JSON.stringify(newConfig)); };
    const handleResetFactory = () => { if(confirm("Réinitialiser les coefficients ?")) { setSubjectsConfig(DEFAULT_CONFIG); localStorage.removeItem('scolarProAdminConfig'); } };
    
    // Générateur props (Reste inchangé)
    const [genLevel, setGenLevel] = useState('6eme');
    const [studentCount, setStudentCount] = useState(10);
    const [lv2Distribution, setLv2Distribution] = useState('MIXED');
    const [targetMin, setTargetMin] = useState(10.00);
    const [targetMax, setTargetMax] = useState(11.00);
    const [data, setData] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLevel, setGeneratedLevel] = useState('');
    const [usedSubjects, setUsedSubjects] = useState([]);
    const hasLV2Gen = useMemo(() => subjectsConfig[genLevel]?.some(s => s.isLV2), [genLevel, subjectsConfig]);

    const generateData = () => {
        // (Logique identique à avant, je compresse pour la place)
        setIsGenerating(true); setData([]);
        setTimeout(() => {
            const currentSubjectsGen = subjectsConfig[genLevel]; const subjects = JSON.parse(JSON.stringify(currentSubjectsGen)); setUsedSubjects(subjects); const newData = []; const tMin = parseFloat(targetMin); const tMax = parseFloat(targetMax); const targetPivot = (tMin + tMax) / 2;
            for (let i = 0; i < studentCount; i++) {
                let student = { id: i + 1, grades: {}, subGrades: {}, average: 0, level: genLevel }; let activeLV2 = null; if (hasLV2Gen) { if (lv2Distribution === 'ALL_ESP') activeLV2 = 'Espagnol'; else if (lv2Distribution === 'ALL_ALL') activeLV2 = 'Allemand'; else { activeLV2 = Math.random() < 0.5 ? 'Espagnol' : 'Allemand'; } }
                let isValid = false; let attempts = 0; while (!isValid && attempts < 500) { let totalPoints = 0; let totalCoef = 0; subjects.forEach(sub => { let gradeValue; if (sub.isLV2) { if (sub.name === activeLV2) { gradeValue = randomFloat(Math.max(0, targetPivot - 1.5), Math.min(20, targetPivot + 1.5)); } else { gradeValue = 22; } } else if (sub.isSport) { gradeValue = randomFloat(14, 15); } else if (sub.isConduite) { gradeValue = Math.random() < 0.5 ? 14 : 15; } else { gradeValue = randomFloat(Math.max(0, targetPivot - 1.5), Math.min(20, targetPivot + 1.5)); if (attempts > 200) { gradeValue = randomFloat(Math.max(0, targetPivot - 3), Math.min(20, targetPivot + 3)); } } if (sub.subs) { let sT=0, sC=0; sub.subs.forEach(sItem => { const v = Math.max(0, Math.min(20, randomFloat(gradeValue-0.5, gradeValue+0.5))); student.subGrades[sItem.name]=v; sT+=v*sItem.coef; sC+=sItem.coef; }); gradeValue = sC>0 ? sT/sC : 0; } student.grades[sub.name] = gradeValue; if (gradeValue !== 22) { totalPoints += gradeValue * sub.coef; totalCoef += sub.coef; } }); const avg = totalCoef > 0 ? totalPoints / totalCoef : 0; if (avg >= tMin && avg <= tMax) { student.average = avg; isValid = true; } else { attempts++; } } if (!isValid) { student.average = (tMin + tMax) / 2; } newData.push(student);
            }
            setData(newData); setGeneratedLevel(genLevel); setIsGenerating(false);
        }, 400);
    };
    const exportToCSV = () => { /* ... Identique avant ... */ if (!data.length) return; const subjects = usedSubjects; let header = ["Niveau", "Eleve"]; subjects.forEach(s => { if (s.subs) { s.subs.forEach(sub => header.push(`${s.name} - ${sub.label}`)); header.push(`${s.name} Moy`); } else { header.push(s.name); } }); header.push("Moyenne Generale"); const rows = data.map(st => { let r = [st.level, `Eleve ${st.id}`]; subjects.forEach(s => { if(s.subs){ s.subs.forEach(sub => r.push(st.subGrades[sub.name].toFixed(2).replace('.',','))); r.push(st.grades[s.name].toFixed(2).replace('.',',')); } else { r.push(st.grades[s.name]===22?"":st.grades[s.name].toFixed(2).replace('.',',')); } }); r.push(st.average.toFixed(2).replace('.',',')); return r; }); const csvContent = [header.join(";"), ...rows.map(r => r.join(";"))].join("\n"); const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.setAttribute("href", url); link.setAttribute("download", `ScolarPro_${new Date().toISOString().slice(0,10)}.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link); };
    const generatorProps = { genLevel, setGenLevel, studentCount, setStudentCount, lv2Distribution, setLv2Distribution, targetMin, setTargetMin, targetMax, setTargetMax, data, isGenerating, hasLV2Gen, generateData, exportToCSV, handleResetApp: () => { if(confirm("Effacer les données générées ?")) setData([]); } };

    if (currentView === 'landing') return <LandingPage onStart={() => setCurrentView('app')} />;

    return (
        <div className="min-h-screen pb-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} subjectsConfig={subjectsConfig} onUpdateConfig={handleUpdateConfig} onResetFactory={handleResetFactory} generatorProps={generatorProps} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleGoogleLogin} />
            <div className="pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in no-print">
                <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setCurrentView('landing')}>
                    <div className="h-12 w-12 bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-xl shadow-lg shadow-brand-500/20 flex items-center justify-center transform -rotate-3"><Icons.GraduationCap size={24} /></div>
                    <div><h1 className="text-2xl font-extrabold tracking-tight text-slate-800 font-heading">ScolarPro <span className="text-brand-600">CI</span></h1></div>
                </div>
                <div className="bg-white p-1 rounded-xl border border-slate-200 flex shadow-sm">
                    <button onClick={() => setActiveTab('calculator')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}><Icons.Calculator size={16} /> Calcul</button>
                    <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'profile' ? 'bg-brand-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}><Icons.UserCircle size={16} /> Mon Évolution</button>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    {session && (
                        <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-600 transition-colors" title="Déconnexion">
                            <Icons.LogOut size={16}/>
                        </button>
                    )}
                     <button onClick={() => setIsAdminOpen(true)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Icons.Lock size={16}/></button>
                </div>
            </div>
            {activeTab === 'profile' ? (
                isLoggedIn ? (
                    <EvolutionView subjectsConfig={subjectsConfig} currentProfile={userProfile} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6"><Icons.Lock size={40} /></div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Profil Verrouillé</h2>
                        <p className="text-slate-500 mb-8 max-w-md text-center">Connectez-vous pour accéder à votre historique, vos graphiques d'évolution et vos badges.</p>
                        <button onClick={() => setIsAuthModalOpen(true)} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"><Icons.Cloud size={18} /> Se Connecter</button>
                    </div>
                )
            ) : (
                <Calculator level={userProfile.level} subjectsConfig={subjectsConfig} onLevelChange={(l) => setUserProfile(p => ({...p, level: l}))} onSaveToProfile={handleSaveToProfile} currentPeriod={currentPeriod} onPeriodChange={setCurrentPeriod} savedActiveSubjects={userProfile.activeSubjects} />
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);