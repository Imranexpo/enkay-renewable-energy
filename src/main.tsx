import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import AdminPage from './components/admin/AdminPage';
import './index.css';

// /admin is a standalone dashboard: no intro video, navbar or footer.
const isAdmin = /^\/admin(\/|$)/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(isAdmin ? <AdminPage /> : <App />);
