const { useState, useEffect, useMemo, useCallback } = React;

// Configuration par DÉFAUT des Matières et Coefficients
const DEFAULT_SUBJECTS_CONFIG = {
    '6eme': [
        { 
            name: 'Francais', coef: 2, 
            subs: [
                { name: 'CF', label: 'CF', coef: 1 },
                { name: 'OG', label: 'OG', coef: 1 },
                { name: 'EO', label: 'EO', coef: 1 }
            ]
        }, 
        { name: 'Mathematiques', coef: 1 }, { name: 'Anglais', coef: 1 },
        { name: 'Physique-Chimie', coef: 1 }, { name: 'SVT', coef: 1 }, { name: 'Histoire-Geo', coef: 1 },
        { name: 'EDHC', coef: 1 }, { name: 'EPS', coef: 1, isSport: true }, 
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '5eme': [
        { 
            name: 'Francais', coef: 2, 
            subs: [
                { name: 'CF', label: 'CF', coef: 1 },
                { name: 'OG', label: 'OG', coef: 1 },
                { name: 'EO', label: 'EO', coef: 1 }
            ]
        }, 
        { name: 'Mathematiques', coef: 1 }, { name: 'Anglais', coef: 1 },
        { name: 'Physique-Chimie', coef: 1 }, { name: 'SVT', coef: 1 }, { name: 'Histoire-Geo', coef: 1 },
        { name: 'EDHC', coef: 1 }, { name: 'EPS', coef: 1, isSport: true },
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '4eme': [
        { 
            name: 'Francais', coef: 3,
            subs: [
                { name: 'CF', label: 'CF', coef: 2 },
                { name: 'EO', label: 'EO', coef: 1 },
                { name: 'OG', label: 'OG', coef: 1 }
            ]
        }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 3 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'EDHC', coef: 2 }, 
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '3eme': [
        { 
            name: 'Francais', coef: 3,
            subs: [
                { name: 'CF', label: 'CF', coef: 2 },
                { name: 'EO', label: 'EO', coef: 1 },
                { name: 'OG', label: 'OG', coef: 1 }
            ]
        }, 
        { name: 'Mathematiques', coef: 3 }, { name: 'Anglais', coef: 2 },
        { name: 'Physique-Chimie', coef: 3 }, { name: 'SVT', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'EDHC', coef: 2 },
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '2nd A': [
        { name: 'Francais', coef: 4 }, { name: 'Histoire-Geo', coef: 3 }, { name: 'Anglais', coef: 3 },
        { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 2 },
        { name: 'Physique-Chimie', coef: 2 }, { name: 'EPS', coef: 1, isSport: true },
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '2nd C': [
        { name: 'Mathematiques', coef: 5 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Francais', coef: 2 }, { name: 'Histoire-Geo', coef: 2 }, { name: 'Anglais', coef: 2 },
        { name: 'Espagnol', coef: 2, isLV2: true }, { name: 'Allemand', coef: 2, isLV2: true },
        { name: 'EPS', coef: 1, isSport: true },
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '1ere A': [
        { name: 'Francais', coef: 4 }, { name: 'Philosophie', coef: 3 }, { name: 'Histoire-Geo', coef: 4 }, 
        { name: 'Anglais', coef: 3 }, 
        { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 2 }, { name: 'Physique-Chimie', coef: 2 }, 
        { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ],
    '1ere D': [
        { name: 'Mathematiques', coef: 4 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Francais', coef: 2 }, { name: 'Philosophie', coef: 2 }, { name: 'Histoire-Geo', coef: 2 }, 
        { name: 'Anglais', coef: 2 }, { name: 'EPS', coef: 1, isSport: true },
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    'TLE A': [
        { name: 'Philosophie', coef: 5 }, { name: 'Francais', coef: 4 }, { name: 'Histoire-Geo', coef: 4 },
        { name: 'Anglais', coef: 3 }, 
        { name: 'Espagnol', coef: 3, isLV2: true }, { name: 'Allemand', coef: 3, isLV2: true },
        { name: 'Mathematiques', coef: 2 }, { name: 'SVT', coef: 1 }, { name: 'EPS', coef: 1, isSport: true }, 
        { name: 'Conduite', coef: 1, isConduite: true }
    ],
    'TLE D': [
        { name: 'Mathematiques', coef: 4 }, { name: 'Physique-Chimie', coef: 4 }, { name: 'SVT', coef: 4 },
        { name: 'Philosophie', coef: 2 }, { name: 'Francais', coef: 2 }, { name: 'Histoire-Geo', coef: 2 },
        { name: 'Anglais', coef: 2 }, { name: 'EPS', coef: 1, isSport: true }, { name: 'Conduite', coef: 1, isConduite: true }
    ]
};

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

// Fonction de calcul de moyenne
const calculateAverage = (student, subjects) => {
    let totalPoints = 0;
    let totalCoef = 0;

    subjects.forEach(sub => {
        let grade = student.grades[sub.name];
        if (grade === 22) return;
        
        totalPoints += grade * sub.coef;
        totalCoef += sub.coef;
    });

    return totalCoef > 0 ? totalPoints / totalCoef : 0;
};

// --- Icons (CORRIGÉS) ---
const Icons = {
    Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Refresh: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
    Zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    GraduationCap: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Globe: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>,
    ChevronDown: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
    Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    RotateCcw: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
    Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
};

const CoeffsModal = ({ isOpen, onClose, subjects, onUpdate, onReset }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">Configuration des Coefficients</h3>
                        <p className="text-sm text-slate-500">Ajustez les pondérations pour le calcul des moyennes</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                        <Icons.X />
                    </button>
                </div>
                
                <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 gap-4">
                        {subjects.map((sub, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 transition-all hover:border-blue-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-slate-700">{sub.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Coef</span>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={sub.coef}
                                            onChange={(e) => onUpdate(idx, e.target.value)}
                                            className="w-16 p-1 text-center font-bold text-blue-600 bg-white border border-slate-200 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                {sub.subs && (
                                    <div className="mt-3 pl-4 border-l-2 border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {sub.subs.map((s, sIdx) => (
                                            <div key={sIdx} className="flex items-center justify-between bg-white p-2 rounded border border-slate-100">
                                                <span className="text-sm text-slate-600">{s.label}</span>
                                                <input 
                                                    type="number" 
                                                    min="1"
                                                    value={s.coef}
                                                    onChange={(e) => onUpdate(idx, e.target.value, sIdx)}
                                                    className="w-12 p-1 text-center text-sm font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded focus:border-blue-400 outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                    <button 
                        onClick={onReset}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Icons.RotateCcw /> Réinitialiser
                    </button>
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors shadow-lg shadow-slate-200"
                    >
                        Terminer
                    </button>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const [level, setLevel] = useState('6eme');
    const [studentCount, setStudentCount] = useState(10);
    
    const [lv2Distribution, setLv2Distribution] = useState('MIXED');
    
    const [targetMin, setTargetMin] = useState(10.00);
    const [targetMax, setTargetMax] = useState(11.00);
    
    const [subjectsConfig, setSubjectsConfig] = useState(DEFAULT_SUBJECTS_CONFIG);
    const currentSubjects = useMemo(() => subjectsConfig[level], [subjectsConfig, level]);
    const [usedSubjects, setUsedSubjects] = useState([]);
    
    const [data, setData] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedLevel, setGeneratedLevel] = useState('');
    const [isCoeffMenuOpen, setIsCoeffMenuOpen] = useState(false);

    const hasLV2 = useMemo(() => subjectsConfig[level]?.some(s => s.isLV2), [level, subjectsConfig]);

    useEffect(() => {
        const savedData = localStorage.getItem('scolarProState');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed) {
                    setLevel(parsed.level || '6eme');
                    setStudentCount(parsed.studentCount || 10);
                    setLv2Distribution(parsed.lv2Distribution || 'MIXED');
                    setTargetMin(parsed.targetMin || 10.00);
                    setTargetMax(parsed.targetMax || 11.00);
                    setSubjectsConfig(parsed.subjectsConfig || DEFAULT_SUBJECTS_CONFIG);
                    setData(parsed.data || []);
                    setGeneratedLevel(parsed.generatedLevel || '');
                    setUsedSubjects(parsed.usedSubjects || []);
                }
            } catch (e) {
                console.error("Erreur de chargement de l'historique", e);
            }
        }
        setIsLoaded(true); 
    }, []);

    useEffect(() => {
        if (!isLoaded) return; 

        const stateToSave = {
            level,
            studentCount,
            lv2Distribution,
            targetMin,
            targetMax,
            subjectsConfig,
            data,
            generatedLevel,
            usedSubjects
        };
        localStorage.setItem('scolarProState', JSON.stringify(stateToSave));
    }, [level, studentCount, lv2Distribution, targetMin, targetMax, subjectsConfig, data, generatedLevel, usedSubjects, isLoaded]);

    const handleResetApp = () => {
        if(confirm("Voulez-vous vraiment effacer tout l'historique et recommencer à zéro ?")) {
            localStorage.removeItem('scolarProState');
            setLevel('6eme');
            setStudentCount(10);
            setLv2Distribution('MIXED');
            setTargetMin(10.00);
            setTargetMax(11.00);
            setSubjectsConfig(JSON.parse(JSON.stringify(DEFAULT_SUBJECTS_CONFIG))); 
            setData([]);
            setGeneratedLevel('');
            setUsedSubjects([]);
        }
    };

    const handleCoeffUpdate = (subjectIndex, newVal, subSubjectIndex = null) => {
        const val = parseFloat(newVal) || 0;
        setSubjectsConfig(prevConfig => {
            const newLevelConfig = prevConfig[level].map((sub, idx) => {
                    if (idx !== subjectIndex) return sub;
                    const newSub = { ...sub };
                    if (subSubjectIndex !== null) {
                        newSub.subs = sub.subs.map((s, sIdx) => 
                        sIdx === subSubjectIndex ? { ...s, coef: val } : s
                        );
                    } else {
                        newSub.coef = val;
                    }
                    return newSub;
            });
            return { ...prevConfig, [level]: newLevelConfig };
        });
    };

    const handleResetCoeffs = () => {
        setSubjectsConfig(prev => ({
            ...prev,
            [level]: DEFAULT_SUBJECTS_CONFIG[level]
        }));
    };

    const toggleStudentLV2 = (studentIndex, newLang) => {
        const newData = [...data];
        const student = { ...newData[studentIndex] };
        const subjects = usedSubjects; 
        
        const tMin = parseFloat(targetMin);
        const tMax = parseFloat(targetMax);
        const targetPivot = (tMin + tMax) / 2;

        const activeSub = subjects.find(s => s.name === newLang);
        if (!activeSub) return;
        
        subjects.filter(s => s.isLV2 && s.name !== newLang).forEach(s => {
            student.grades[s.name] = 22;
        });

        if (student.grades[newLang] === 22) {
                let gradeValue = randomFloat(Math.max(0, targetPivot - 1.5), Math.min(20, targetPivot + 1.5));
                student.grades[newLang] = gradeValue;
        }
        
        student.average = calculateAverage(student, subjects);
        newData[studentIndex] = student;
        setData(newData);
    };

    const generateData = () => {
        setIsGenerating(true);
        setData([]);
        
        setTimeout(() => {
            const subjects = JSON.parse(JSON.stringify(currentSubjects));
            setUsedSubjects(subjects);
            
            const newData = [];
            const tMin = parseFloat(targetMin);
            const tMax = parseFloat(targetMax);
            const targetPivot = (tMin + tMax) / 2;

            for (let i = 0; i < studentCount; i++) {
                let student = { id: i + 1, grades: {}, subGrades: {}, average: 0, level: level };
                
                let activeLV2 = null;
                if (hasLV2) {
                    if (lv2Distribution === 'ALL_ESP') activeLV2 = 'Espagnol';
                    else if (lv2Distribution === 'ALL_ALL') activeLV2 = 'Allemand';
                    else {
                        activeLV2 = Math.random() < 0.5 ? 'Espagnol' : 'Allemand';
                    }
                }

                let isValid = false;
                let attempts = 0;

                while (!isValid && attempts < 500) {
                    let totalPoints = 0;
                    let totalCoef = 0;
                    
                    subjects.forEach(sub => {
                        let gradeValue;

                        if (sub.isLV2) {
                            if (sub.name === activeLV2) {
                                const variation = 1.5;
                                gradeValue = randomFloat(Math.max(0, targetPivot - variation), Math.min(20, targetPivot + variation));
                            } else {
                                gradeValue = 22;
                            }
                        }
                        else if (sub.isSport) {
                            gradeValue = randomFloat(14, 15);
                        } else if (sub.isConduite) {
                            gradeValue = Math.random() < 0.5 ? 14 : 15;
                        } else {
                            const variation = 1.5; 
                            gradeValue = randomFloat(Math.max(0, targetPivot - variation), Math.min(20, targetPivot + variation));
                            
                            if (attempts > 200) {
                                gradeValue = randomFloat(Math.max(0, targetPivot - 3), Math.min(20, targetPivot + 3));
                            }
                        }

                        if (sub.subs) {
                            let subTotal = 0;
                            let subCoefSum = 0;
                            sub.subs.forEach(sItem => {
                                let subVal = randomFloat(gradeValue - 0.5, gradeValue + 0.5);
                                subVal = Math.max(0, Math.min(20, subVal));
                                student.subGrades[sItem.name] = subVal;
                                subTotal += subVal * sItem.coef;
                                subCoefSum += sItem.coef;
                            });
                            gradeValue = subCoefSum > 0 ? subTotal / subCoefSum : 0;
                        }

                        student.grades[sub.name] = gradeValue;
                        
                        if (gradeValue !== 22) {
                            totalPoints += gradeValue * sub.coef;
                            totalCoef += sub.coef;
                        }
                    });

                    const avg = totalCoef > 0 ? totalPoints / totalCoef : 0;
                    
                    if (avg >= tMin && avg <= tMax) {
                        student.average = avg;
                        isValid = true;
                    } else {
                        attempts++;
                    }
                }

                if (!isValid) {
                    student.average = (tMin + tMax) / 2;
                }
                newData.push(student);
            }
            setData(newData);
            setGeneratedLevel(level);
            setIsGenerating(false);
        }, 400);
    };

    const exportToCSV = () => {
        if (data.length === 0) return;
        const subjects = usedSubjects;
        let header = ["Niveau", "Eleve"];
        subjects.forEach(s => {
            if (s.subs) {
                s.subs.forEach(sub => header.push(`${s.name} - ${sub.label} (x${sub.coef})`));
                header.push(`${s.name} Moy (x${s.coef})`);
            } else {
                header.push(`${s.name} (x${s.coef})`);
            }
        });
        header.push("Moyenne Generale");
        
        const rows = data.map(student => {
            let row = [student.level, `Eleve ${student.id}`];
            subjects.forEach(s => {
                if (s.subs) {
                    s.subs.forEach(sub => row.push(roundToTwo(student.subGrades[sub.name]).toFixed(2).replace('.', ',')));
                    row.push(roundToTwo(student.grades[s.name]).toFixed(2).replace('.', ','));
                } else {
                    const val = student.grades[s.name];
                    const displayVal = val === 22 ? "22" : roundToTwo(val).toFixed(2).replace('.', ',');
                    row.push(displayVal);
                }
            });
            row.push(roundToTwo(student.average).toFixed(2).replace('.', ','));
            return row;
        });

        const csvContent = [header.join(";"), ...rows.map(r => r.join(";"))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `ScolarPro_Notes_${generatedLevel}_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen p-6 md:p-12 w-full max-w-[1600px] mx-auto">
            <CoeffsModal 
                isOpen={isCoeffMenuOpen} 
                onClose={() => setIsCoeffMenuOpen(false)}
                subjects={currentSubjects}
                onUpdate={handleCoeffUpdate}
                onReset={handleResetCoeffs}
            />

            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 animate-fade-in">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg">
                            <Icons.GraduationCap />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight brand-gradient">
                            ScolarPro CI
                        </h1>
                    </div>
                    <p className="text-slate-500 font-medium ml-1">Système Éducatif Ivoirien • Outil d'Aide à la Décision</p>
                </div>
            </div>

            {/* Zone de Contrôle */}
            <div className="app-panel p-6 rounded-xl mb-8 animate-fade-in">
                <div className="flex flex-col xl:flex-row gap-6 items-end justify-between">
                    
                    <div className="flex flex-col md:flex-row gap-6 w-full xl:w-auto flex-wrap items-end">
                        {/* Selecteur Niveau */}
                        <div className="flex flex-col gap-2 w-full md:w-48 relative group">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Niveau</label>
                            <div className="relative">
                                <select 
                                    value={level} 
                                    onChange={(e) => setLevel(e.target.value)}
                                    className="clean-input w-full p-3 pr-10 rounded-lg text-slate-700 font-bold outline-none cursor-pointer appearance-none"
                                >
                                    {Object.keys(DEFAULT_SUBJECTS_CONFIG).map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                    <Icons.ChevronDown />
                                </div>
                            </div>
                        </div>

                        {/* Cible Moyenne */}
                        <div className="flex flex-col gap-2 w-full md:w-56">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-1">
                                <Icons.Target /> Cible Moyenne
                            </label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        min="0" max="20"
                                        value={targetMin}
                                        onChange={(e) => setTargetMin(e.target.value)}
                                        className="clean-input w-full p-3 rounded-lg text-slate-700 font-bold outline-none text-center"
                                        placeholder="Min"
                                    />
                                    <span className="absolute -bottom-5 left-0 w-full text-center text-[10px] text-slate-400">Min</span>
                                </div>
                                <span className="text-slate-300 font-bold">-</span>
                                <div className="relative flex-1">
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        min="0" max="20"
                                        value={targetMax}
                                        onChange={(e) => setTargetMax(e.target.value)}
                                        className="clean-input w-full p-3 rounded-lg text-slate-700 font-bold outline-none text-center"
                                        placeholder="Max"
                                    />
                                    <span className="absolute -bottom-5 left-0 w-full text-center text-[10px] text-slate-400">Max</span>
                                </div>
                            </div>
                        </div>

                        {/* Selecteur LV2 - Répartition */}
                        {hasLV2 && (
                            <div className="flex flex-col gap-2 w-full md:w-48 animate-fade-in">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Répartition LV2</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Icons.Globe />
                                    </div>
                                    <select 
                                        value={lv2Distribution} 
                                        onChange={(e) => setLv2Distribution(e.target.value)}
                                        className="clean-input w-full p-3 pl-10 pr-10 rounded-lg text-slate-700 font-bold outline-none cursor-pointer appearance-none"
                                    >
                                        <option value="MIXED">Classe Mixte</option>
                                        <option value="ALL_ESP">Tout Espagnol</option>
                                        <option value="ALL_ALL">Tout Allemand</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <Icons.ChevronDown />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Input Effectif */}
                        <div className="flex flex-col gap-2 w-full md:w-32">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Effectif</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Icons.Users />
                                </div>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="1000"
                                    value={studentCount}
                                    onChange={(e) => setStudentCount(parseInt(e.target.value) || 0)}
                                    className="clean-input w-full p-3 pl-10 rounded-lg text-slate-700 font-bold outline-none"
                                    placeholder="Ex: 40"
                                />
                            </div>
                        </div>

                        {/* Config Coeffs Button */}
                        <button 
                            onClick={() => setIsCoeffMenuOpen(true)}
                            className="p-3 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-2 font-bold mb-[1px]"
                            title="Configurer les coefficients"
                        >
                            <Icons.Settings /> 
                            <span className="hidden md:inline">Coeffs</span>
                        </button>
                    </div>

                    {/* Boutons d'Action */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 w-full xl:w-auto mt-6 xl:mt-0">
                        <button 
                            onClick={handleResetApp}
                            className="flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent px-4 py-3 rounded-lg font-bold transition-all text-sm"
                            title="Tout effacer"
                        >
                            <Icons.Trash />
                            <span className="md:hidden xl:inline">Réinitialiser</span>
                        </button>

                        <button 
                            onClick={generateData}
                            disabled={isGenerating}
                            className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGenerating ? 'Calcul...' : <><Icons.Refresh /> GENERER</>}
                        </button>
                        
                        {data.length > 0 && (
                            <button 
                                onClick={exportToCSV}
                                className="flex-1 xl:flex-none flex items-center justify-center gap-2 bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 px-6 py-3 rounded-lg font-bold shadow-sm transition-all active:scale-95"
                            >
                                <Icons.Download /> 
                                CSV
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tableau de Résultats */}
            {data.length > 0 && (
                <div className="app-panel rounded-lg shadow-lg overflow-hidden animate-fade-in border border-slate-200">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 text-white border-b border-slate-700">
                                    <th className="p-4 font-bold text-sm whitespace-nowrap sticky-col bg-slate-800 z-40 text-left w-32 border-r border-slate-700">
                                        ELEVE
                                    </th>
                                    {usedSubjects.map((sub, idx) => {
                                        if (sub.subs) {
                                            return (
                                                <React.Fragment key={idx}>
                                                    {sub.subs.map((s, sIdx) => (
                                                        <th key={`${idx}-${sIdx}`} className="p-3 font-semibold text-xs uppercase tracking-wider text-center border-r border-slate-700/50 bg-slate-800">
                                                            <div className="flex flex-col gap-1">
                                                                <span className="text-slate-300">{sub.name} {s.label}</span>
                                                                <span className="text-[10px] bg-slate-700 px-1 rounded w-fit mx-auto text-slate-300">x{s.coef}</span>
                                                            </div>
                                                        </th>
                                                    ))}
                                                    <th className="p-3 font-bold text-xs uppercase tracking-wider text-center border-r border-slate-700 bg-slate-700/50">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-white">{sub.name} MOY</span>
                                                            <span className="text-[10px] bg-slate-600 px-1 rounded w-fit mx-auto text-white">x{sub.coef}</span>
                                                        </div>
                                                    </th>
                                                </React.Fragment>
                                            );
                                        }
                                        return (
                                            <th key={idx} className="p-3 font-bold text-xs uppercase tracking-wider text-center border-r border-slate-700/50 min-w-[80px]">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-slate-200">{sub.name}</span>
                                                    <span className="text-[10px] bg-slate-700 px-1 rounded w-fit mx-auto text-slate-300">x{sub.coef}</span>
                                                </div>
                                            </th>
                                        );
                                    })}
                                    <th className="p-4 font-bold text-sm whitespace-nowrap sticky-col-end bg-slate-900 text-center w-32 border-l border-slate-700 shadow-xl">
                                        MOYENNE
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {data.map((student, i) => (
                                    <tr key={student.id} className={`table-row ${i % 2 === 0 ? 'table-row-even' : 'table-row-odd'} border-b border-slate-100`}>
                                        <td className={`p-4 font-bold text-slate-700 sticky-col border-r border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                            Eleve {student.id}
                                        </td>
                                        
                                        {usedSubjects.map((sub, idx) => {
                                            if (sub.subs) {
                                                const mainGrade = student.grades[sub.name];
                                                return (
                                                    <React.Fragment key={idx}>
                                                        {sub.subs.map((s, sIdx) => (
                                                            <td key={`${idx}-${sIdx}`} className="p-3 text-center border-r border-slate-200/50 text-slate-500 font-mono">
                                                                {roundToTwo(student.subGrades[s.name]).toFixed(2)}
                                                            </td>
                                                        ))}
                                                        <td className="p-3 text-center border-r border-slate-200 font-bold text-slate-800 bg-blue-50/30 font-mono">
                                                            {roundToTwo(mainGrade).toFixed(2)}
                                                        </td>
                                                    </React.Fragment>
                                                );
                                            }

                                            const grade = student.grades[sub.name];
                                            
                                            let textColor = "text-slate-600";
                                            let bgColor = "";
                                            let displayText = "";
                                            
                                            if (grade === 22) {
                                                textColor = "text-slate-300 font-normal";
                                                bgColor = "bg-slate-50";
                                                displayText = "22";
                                            } else {
                                                displayText = roundToTwo(grade).toFixed(2);
                                                if (sub.isSport) { textColor = "text-emerald-700 font-bold"; bgColor="bg-emerald-50/50"; }
                                                else if (sub.isConduite) { textColor = "text-purple-700 font-bold"; bgColor="bg-purple-50/50"; }
                                                else if (grade < 10) textColor = "text-red-600";
                                            }
                                            
                                            const isClickable = sub.isLV2;
                                            
                                            return (
                                                <td 
                                                    key={idx} 
                                                    onClick={() => isClickable && toggleStudentLV2(i, sub.name)}
                                                    className={`p-3 text-center border-r border-slate-200/50 font-mono ${textColor} ${bgColor} ${isClickable ? 'clickable-grade' : ''}`}
                                                    title={isClickable ? "Cliquez pour activer/désactiver cette langue" : ""}
                                                >
                                                    {displayText}
                                                </td>
                                            );
                                        })}

                                        <td className={`p-4 font-bold text-center sticky-col-end border-l border-slate-200 text-base font-mono ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                                            <span className="text-blue-700">{roundToTwo(student.average).toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);