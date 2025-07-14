import { useEffect, useState } from "react";
import api from "../utils/axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/user/profile");
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (err) {
                console.log(`Error in AuthProvider: ${err}`);
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
            checkAuth();
        } else {
            checkAuth();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
