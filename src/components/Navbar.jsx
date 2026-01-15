import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="news-navbar">
            <div className="nav-container">
                {/* BRAND - Left */}
                <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
                    <span className="brand-title">ACM-XIM-ENVOY</span>
                    <span className="brand-subtitle">EDITORIAL & NEWS</span>
                </Link>

                {/* RIGHT CONTENT GROUP */}
                <div className="nav-right-side">
                    {/* DESKTOP NAV - Grouped on right */}
                    <nav className="desktop-links">
                        <Link to="/" className={isActive('/') ? 'active' : ''}>HOME</Link>
                        <Link to="/news" className={isActive('/news') ? 'active' : ''}>NEWS</Link>
                        <Link to="/events" className={isActive('/events') ? 'active' : ''}>EVENTS</Link>
                        <Link to="/forum" className={isActive('/forum') ? 'active' : ''}>FORUM</Link>
                    </nav>

                    {user ? (
                        <div className="profile-outer" ref={dropdownRef}>
                            <div className="user-pill-div" onClick={() => setShowProfile(!showProfile)}>
                                <div className="avatar-circle">{user.name?.charAt(0).toUpperCase()}</div>
                                <span className="pill-text">{user.email}</span>
                            </div>

                            {showProfile && (
                                <div className="editorial-dropdown">
                                    <div className="drop-section">
                                        <div className="drop-info">
                                            <label>NAME</label>
                                            <div className="drop-row">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                <p>{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="drop-info">
                                            <label>EMAIL</label>
                                            <div className="drop-row">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={logout} className="logout-red-btn">
                                        SECURE LOGOUT
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-pill">LOGIN</Link>
                    )}

                    {/* HAMBURGER - Animated to X */}
                    <button className={`hamburger-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                        <span></span><span></span><span></span>
                    </button>
                </div>

                {/* MOBILE OVERLAY */}
                <div className={`mobile-fs-menu ${open ? 'active' : ''}`}>
                    <nav className="mobile-stack">
                        <Link to="/" onClick={() => setOpen(false)}>HOME</Link>
                        <Link to="/news" onClick={() => setOpen(false)}>NEWS</Link>
                        <Link to="/events" onClick={() => setOpen(false)}>EVENTS</Link>
                        <Link to="/forum" onClick={() => setOpen(false)}>FORUM</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;