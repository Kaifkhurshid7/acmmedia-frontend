import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        setShowProfile(false);
    };

    return (
        <header className="news-navbar" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="nav-container">
                {/* Brand Section */}
                <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
                    <span className="brand-title">ACM-XIM-ENVOY</span>
                </Link>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="hamburger"
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Main Navigation Menu */}
                <nav className={`nav-menu ${open ? 'open' : ''}`}>
                    <button
                        className="menu-close"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>

                    <ul className="nav-links">
                        <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
                        <li><Link to="/news" onClick={() => setOpen(false)}>Global News</Link></li>
                        <li><Link to="/events" onClick={() => setOpen(false)}>Events</Link></li>
                        <li><Link to="/forum" onClick={() => setOpen(false)}>Forum</Link></li>

                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <li>
                                        <Link to="/admin" className="admin-link" onClick={() => setOpen(false)}>
                                            Admin Desk
                                        </Link>
                                    </li>
                                )}

                                {/* User Profile Dropdown Section */}
                                <li className="profile-item" style={{ position: 'relative' }} ref={dropdownRef}>
                                    <div
                                        className="user-profile-trigger"
                                        onClick={() => setShowProfile(!showProfile)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            padding: '6px 14px',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: '25px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            transition: '0.3s'
                                        }}
                                    >
                                        <div style={{
                                            width: '26px', height: '26px', borderRadius: '50%',
                                            background: '#ffffff', color: '#000000',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 'bold', fontSize: '0.8rem'
                                        }}>
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: '#fff', fontWeight: '500' }}>
                                            {user.name.split(' ')[0]} {/* Shows only first name to keep it clean */}
                                        </span>
                                        <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>{showProfile ? '▲' : '▼'}</span>
                                    </div>

                                    {/* Dropdown Card */}
                                    {showProfile && (
                                        <div className="profile-details-dropdown" style={{
                                            position: 'absolute', top: '50px', right: '0',
                                            width: '260px', background: '#121212',
                                            border: '1px solid #333', borderRadius: '14px',
                                            padding: '20px', zIndex: 1001,
                                            boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                                            textAlign: 'left'
                                        }}>
                                            {/* User Info */}
                                            <div style={{ marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '12px' }}>
                                                <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                                    {user.name}
                                                </p>
                                                <p style={{ fontSize: '0.8rem', color: '#888', margin: '4px 0 0 0', wordBreak: 'break-all' }}>
                                                    {user.email || "No email provided"}
                                                </p>
                                            </div>

                                            {/* Role Info */}
                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={{ fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                                                    Membership Status
                                                </label>
                                                <div style={{
                                                    marginTop: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '5px 10px',
                                                    borderRadius: '6px',
                                                    background: user.role === 'admin' ? 'rgba(255, 215, 0, 0.05)' : 'rgba(255,255,255,0.03)',
                                                    border: `1px solid ${user.role === 'admin' ? '#ffd700' : '#444'}`
                                                }}>
                                                    <span style={{ fontSize: '0.8rem' }}>
                                                        {user.role === 'admin' ? '🛡️' : '🎓'}
                                                    </span>
                                                    <p style={{ fontSize: '0.75rem', color: user.role === 'admin' ? '#ffd700' : '#fff', margin: 0, fontWeight: '600' }}>
                                                        {user.role === 'admin' ? 'Administrator' : 'Chapter Member'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Logout Button */}
                                            <button
                                                onClick={handleLogout}
                                                className="logout-btn"
                                                style={{
                                                    width: '100%', padding: '12px',
                                                    background: 'transparent',
                                                    color: '#ff4444', border: '1px solid #ff4444',
                                                    borderRadius: '8px', cursor: 'pointer',
                                                    fontWeight: 'bold', fontSize: '0.85rem',
                                                    transition: '0.2s'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.background = 'rgba(255, 68, 68, 0.1)';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.background = 'transparent';
                                                }}
                                            >
                                                Secure Logout
                                            </button>
                                        </div>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
                                <li>
                                    <Link to="/register" className="register-link" onClick={() => setOpen(false)}>
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;