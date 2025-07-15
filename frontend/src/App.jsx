// @ imports
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import parse from "html-react-parser";
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth.js";

// @ component
const App = () => {
    // @ states
    const [effect, setEffect] = useState("");
    const { loading } = useAuth();

    // @ functions
    const location = useLocation();

    // @ useEffects
    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const effect = localStorage.getItem("effect");
        if (saved) {
            document.documentElement.setAttribute("data-theme", saved);
        }
        if (effect) {
            setEffect(effect);
        }
    }, [location.pathname]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }


    // @ return
    return (
        <>
            <div id="app-container" className={`relative h-full w-full`}>
                <div id="bg-effect">{effect && parse(effect)}</div>

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage setEffect={setEffect} />}
                    />
                    <Route
                        path="/create"
                        element={<CreatePage setEffect={setEffect} />}
                    />
                    <Route
                        path="/auth"
                        element={<AuthPage setEffect={setEffect} />}
                    />
                    <Route
                        path="/note/:id"
                        element={<NoteDetailPage setEffect={setEffect} />}
                    />
                </Routes>
            </div>
        </>
    );
};

export default App;
