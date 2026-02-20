export const auth = {
    // These would ideally be fetched from Supabase 'access_keys' table
    // For now, keeping the user's hardcoded keys but in a separate module
    accessKeys: {
        'TCH-MTH-2025-A1': { role: 'teacher', name: 'Math Teacher' },
        'TCH-SCI-2025-B2': { role: 'teacher', name: 'Science Teacher' },
        'TCH-ENG-2025-C3': { role: 'teacher', name: 'English Teacher' },
        'TCH-MNE-2025-D4': { role: 'teacher', name: 'Montenegrin Teacher' },
        'TCH-ART-2025-E5': { role: 'teacher', name: 'Art Teacher' },
        'TCH-HIS-2025-F6': { role: 'teacher', name: 'History Teacher' },
        'TCH-GEO-2025-G7': { role: 'teacher', name: 'Geography Teacher' },
        'TCH-ITE-2025-H8': { role: 'teacher', name: 'IT Teacher' },
        // Parent keys... (omitted for brevity here but should be in full)
    },

    login(key) {
        const user = this.accessKeys[key.toUpperCase()];
        if (user) {
            sessionStorage.setItem('school_user', JSON.stringify({ key, ...user }));
            return user;
        }
        return null;
    },

    logout() {
        sessionStorage.removeItem('school_user');
    },

    getCurrentUser() {
        const saved = sessionStorage.getItem('school_user');
        return saved ? JSON.parse(saved) : null;
    }
};
