import React, { createContext, useState, useEffect } from "react";
import * as authApi from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const { data } = await authApi.getCurrentUser();
                    setUser(data);
                } catch (err) {
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await authApi.login({ email, password });
        localStorage.setItem("token", data.token);
        try {
            const { data: me } = await authApi.getCurrentUser();
            setUser(me);
        } catch (err) {
            setUser({ token: data.token });
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
