// @ imports
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import parse from "html-react-parser";
import Navbar from "./components/Navbar";
// import bg_effect from "";
// import { bgEffects } from "./utils/constants";

// @ component
const App = () => {
    // @ states
    const [effect, setEffect] = useState("");

    // @ functions
    const location = useLocation();
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

    // @ return
    return (
        <>
            <div id="app-container" className={`relative h-full w-full`}>
                <div id="bg-effect">{effect && parse(effect)}</div>

                <Navbar setEffect={setEffect} />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/note/:id" element={<NoteDetailPage />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
