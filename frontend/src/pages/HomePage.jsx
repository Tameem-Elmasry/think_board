// @ imports
import React, { useEffect, useState } from "react";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../utils/axios";
import NotesNotFound from "../components/NoteNotFound";

// @ component
const HomePage = () => {
    // @ States
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // @ Effects
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                if(res.data.data) {
                    setNotes(res.data.data)
                    toast.success("Notes has arrived!");
                } else {
                    setNotes(null)
                    toast.success("There is no Notes!");
                }
                setIsRateLimited(false);
            } catch (error) {
                console.error(`Frontend - Error fetching notes: ${error}}`);
                if (error.response?.status === 429) {
                    toast.error("Too many requests");
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // @ return
    return (
        <div className="min-h-screen">
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
