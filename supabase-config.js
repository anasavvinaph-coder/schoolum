// Supabase Configuration
export const SUPABASE_URL = 'https://shhktowqnbsukpvnovjn.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoaGt0b3dxbmJzdWtwdm5vdmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzM0MDksImV4cCI6MjA4NjQ0OTQwOX0.hO6e7uae90VejH5mU86-EADuTyB6Q34wjCfkJnXkLJE';

// Since we are using standard browser <script type="module">, we expect supabase to be available globally from the CDN
export const getSupabase = () => {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded');
        return null;
    }
    return supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
};
