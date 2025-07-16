import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import useAuth from "../hooks/useAuth.js";
import Navbar from "../components/Navbar.jsx";

const AuthPage = ({ setEffect }) => {
    const { setUser } = useAuth();

    // @ states
    const [haveAccount, setHaveAccount] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // @ functions
    const navigate = useNavigate();

    const handleCreateAcc = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!username || !password) {
                toast.error("ALl inputs are required");
                return;
            }
            const res = await api.post("/user/signup", {
                username,
                password,
            });
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success("Account created successfully");
            navigate("/");
        } catch (error) {
            console.log(`Error creating user: ${error}`);
            if (error.response.status === 409) {
                toast.error("This username already exists!");
            } else if (error.response.status === 429) {
                toast.error("Slow down, You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to create Account");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!username || !password) {
                toast.error("ALl inputs are required");
                return;
            }
            const res = await api.post("/user/login", {
                username,
                password,
            });
            setUser(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            console.log(`Error logging in to user: ${error}`);
            if (error.response.status === 409) {
                toast.error("This username already exists!");
            } else if (error.response.status === 429) {
                toast.error("Slow down, You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to create Account");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSwap = (e) => {
        e.preventDefault();
        setHaveAccount((prev) => !prev);
    };

    return (
        <div className={`min-h-screen`}>
            <Navbar setEffect={setEffect} auth={false} newNote={false} />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-xl mx-auto">
                    <Link to={"/"} className={`btn btn-ghost mb-6`}>
                        <ArrowLeftIcon className="size-5" />
                        Back to Main Page
                    </Link>
                    <div className="card bg-base-100">
                        {!haveAccount ? (
                            <div className="card-body">
                                <h2 className={`card-title text-2xl mb-4`}>
                                    Create New Account
                                </h2>
                                <form onSubmit={handleCreateAcc}>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Username:
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={username}
                                            placeholder="Enter you username"
                                            className="input input-bordered"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Password:
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            placeholder="Enter you password"
                                            className="input input-bordered"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="card-actions justify-between mt-10">
                                        <button
                                            onClick={(e) => handleSwap(e)}
                                            className="btn btn-ghost underline"
                                        >
                                            Have an account ? login
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Creating..."
                                                : "Create Account"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="card-body">
                                <h2 className={`card-title text-2xl mb-4`}>
                                    Login to your account
                                </h2>
                                <form onSubmit={handleLogin}>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Username:
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={username}
                                            placeholder="Enter you username"
                                            className="input input-bordered"
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">
                                                Password:
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            value={password}
                                            placeholder="Enter you password"
                                            className="input input-bordered"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="card-actions justify-between mt-10">
                                        <button
                                            onClick={(e) => handleSwap(e)}
                                            className="btn btn-ghost underline"
                                        >
                                            Create new account
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Logging in..."
                                                : "Login"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
