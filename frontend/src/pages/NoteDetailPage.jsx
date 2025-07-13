// @ imports
 import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { ArrowLeftFromLine, LoaderIcon, Trash2 } from "lucide-react";

// @ component
const NoteDetailPage = () => {
    // @ states
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // @ others
    const navigate = useNavigate();
    const { id } = useParams();

    // @ effects
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data.data);
                toast.success("Note is here!");
            } catch (error) {
                console.log(`Error fetching single note: ${error}`);
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

        fetchNote();
    }, [id]);

    // @ functions
    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this note??"))
            return;
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully!");
            navigate("/");
        } catch (error) {
            console.log(`Error Deleting Note: ${error}`);
            if (error.response.status === 429) {
                toast.error("Slow down, You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to Delete Note");
            }
        }
    };

    const handleSave = async () => {
        console.log("clicked");
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Don't Leave the inputs Empty");
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note Updated successfully");
            navigate("/");
        } catch (error) {
            console.log(`Error updating note: ${error}`);
            if (error.response.status === 429) {
                toast.error("Slow down, You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to save note");
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center`}
            >
                <LoaderIcon className={`animate-spin size-10`} />
            </div>
        );
    }

    // @ return
    return (
        <div className={`min-h-screen`}>
            <div className={`container mx-auto px-4 py-8`}>
                <div className="max-w-4xl mx-auto">
                    <div className={`flex items-center justify-between mb-6`}>
                        <Link to="/" className={`btn btn-ghost`}>
                            <ArrowLeftFromLine className={`size-5`} />
                            Back to Notes
                        </Link>
                        <button
                            onClick={handleDelete}
                            className={`btn btn-error btn-outline`}
                        >
                            <Trash2 className={`size-5`} />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    className={`input input-bordered`}
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your Content here..."
                                    className={`textarea textarea-bordered h-32`}
                                    value={note.content}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            content: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
