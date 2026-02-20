import { getSupabase } from './supabase-config.js';

const supabase = getSupabase();

export const api = {
    // Classes/Lessons
    async getClassEntries() {
        const { data, error } = await supabase
            .from('class_entries')
            .select('*')
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async saveClassEntry(entry) {
        const { data, error } = await supabase
            .from('class_entries')
            .insert([{
                date: entry.date,
                grade: entry.grade,
                subjects: entry.subjects
            }])
            .select();
        if (error) throw error;
        return data;
    },

    async deleteClassEntry(id) {
        const { error } = await supabase
            .from('class_entries')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Grades
    async getGrades() {
        const { data, error } = await supabase
            .from('student_grades')
            .select('*')
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    },

    async saveGrades(grades) {
        const { data, error } = await supabase
            .from('student_grades')
            .insert(grades.map(g => ({
                student_id: g.studentId,
                grade: g.grade,
                subject: g.subject,
                date: g.date
            })))
            .select();
        if (error) throw error;
        return data;
    },

    // Students Management (New Table expected: students)
    async getStudents() {
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('name');
        if (error) {
            console.warn('Students table might not exist yet, falling back to local if needed or returning empty');
            return [];
        }
        return data;
    },

    async addStudent(student) {
        const { data, error } = await supabase
            .from('students')
            .insert([student])
            .select();
        if (error) throw error;
        return data;
    },

    async deleteStudent(id) {
        const { error } = await supabase
            .from('students')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Global Clear
    async clearAllData() {
        // Warning: This requires appropriate RLS or service role if not using a loop
        // For simplicity in this demo environment, we'll try to delete all from both tables
        const tables = ['class_entries', 'student_grades', 'students'];
        for (const table of tables) {
            const { error } = await supabase
                .from(table)
                .delete()
                .neq('id', '0'); // Hacky way to delete all if RLS allows
            if (error) console.error(`Error clearing table ${table}:`, error);
        }
    }
};
