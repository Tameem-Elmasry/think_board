// @ imports
import React, { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../utils/axios";
import NotesNotFound from "../components/NoteNotFound";
import NotAuth from "../components/NotAuth";
import useAuth from "../hooks/useAuth.js";
import Navbar from "../components/Navbar.jsx";

// @ component
const HomePage = ({ setEffect }) => {
    const { user } = useAuth();

    // @ States
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // @ Effects
    useEffect(() => {
        if (!user) return;
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setIsRateLimited(false);
                if (res.data.data) {
                    setNotes(res.data.data);
                    toast.success("Notes Fetched Successfully!");
                } else {
                    setNotes(null);
                    toast.success("There are no Notes!");
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
                if (error.response.status === 429) {
                    toast.error("Slow down, You're creating notes too fast", {
                        duration: 4000,
                        icon: "💀",
                    });
                } else {
                    toast.error("Failed to create note");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [user]);

    if (!user) {
        toast.error("Not logged in!");
        return (
            <div className="min-h-screen">
                <Navbar setEffect={setEffect} newNote={false} auth={true} />
                <NotAuth />
            </div>
        );
    }

    // @ return
    return (
        <div className="min-h-screen">
            <Navbar setEffect={setEffect} newNote auth />
            {isRateLimited && <RateLimitedUI />}

            <div className={`max-w-7xl mx-auto p-4 mt-6`}>
                {loading && (
                    <div className={`text-center text-primary py-10`}>
                        <span className="loading loading-dots loading-md"></span>
                    </div>
                )}

                {!notes && !isRateLimited && <NotesNotFound />}

                {notes && !isRateLimited && (
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
                    >
                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                setNotes={setNotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
