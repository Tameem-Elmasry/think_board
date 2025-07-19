// @ imports
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import parse from "html-react-parser";
import AuthPage from "./pages/AuthPage";
import useAuth from "./hooks/useAuth.js";

// @ component
const App = () => {
    // @ states
    const [effect, setEffect] = useState(`<div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 background:radial-gradient(125%_125%_at_50%_10%,#fff_30%,#0062FF_170%)]"></div><div class="absolute -z-10 bottom-0 left-0 right-0 top-20 bg-[radial-gradient(circle_300px_at_50%_200px,#0062FF_-170%,transparent)]"></div>`);
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
