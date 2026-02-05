import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShieldCheck, LogOut, History } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
                <ShieldCheck className="text-blue-600" />
                PhishGuard
            </Link>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/history" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium">
                            <History size={18} /> History
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                {user.name}
                            </span>
                            <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="text-slate-600 font-medium hover:text-blue-600">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;