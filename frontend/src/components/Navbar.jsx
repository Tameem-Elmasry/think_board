// @ imports
import { Link, useNavigate } from "react-router";
import { ChevronDown, PlusIcon, User2, UserX2Icon } from "lucide-react";
import { themes } from "../utils/constants.js";
import { bgEffects } from "../utils/constants.js";
import useAuth from "../hooks/useAuth.js";
import api from "../utils/axios.js";
import toast from "react-hot-toast";

// @ component
const Navbar = ({ setEffect, newNote, auth }) => {
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.post("/user/logout");
            localStorage.removeItem("user");
            toast.success("Logged out successfully!");
            setUser(null);
            navigate("/");
        } catch (err) {
            toast.error("Error in logging out!");
            console.error("Logout failed:", err);
        }
    };

    // @ functions
    const handleChange = (e) => {
        const theme = e.target.value;
        const bg_effect = bgEffects[theme];
        // & changing UI:
        setEffect(bg_effect);
        // & localstorage settings
        localStorage.setItem("theme", theme);
        localStorage.setItem("effect", bg_effect);
    };

    // @ return
    return (
        <header className="border-b border-base-content/10">
            <div className={`mx-auto max-w-6xl p-4`}>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
                        ThinkBoard
                    </h1>
                    <div className={`flex items-center gap-4`}>
                        {user ? (
                            <>
                                {newNote && (
                                    <>
                                        <Link
                                            to={"/create"}
                                            className="btn btn-primary btn-outline"
                                        >
                                            <PlusIcon className="size-5" />
                                            <span>New Note</span>
                                        </Link>
                                        <div
                                            className={`w-[1px] h-9 bg-gray-500`}
                                        ></div>
                                    </>
                                )}

                                {auth && (
                                    <>
                                        <button
                                            onClick={logout}
                                            className={`btn btn-primary`}
                                        >
                                            <UserX2Icon className={`size-5`} />
                                            <span>Logout</span>
                                        </button>
                                        <div
                                            className={`w-[1px] h-9 bg-gray-500`}
                                        ></div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/auth"
                                    className={`btn btn-secondary`}
                                >
                                    <User2 className={`size-5`} />
                                    <span>Login</span>
                                </Link>
                                <div
                                    className={`w-[1px] h-9 bg-gray-500`}
                                ></div>
                            </>
                        )}

                        <div className="dropdown">
                            <div tabIndex={0} className="btn">
                                Theme
                                <ChevronDown />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content  bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
                            >
                                {themes.map((t) => (
                                    <li key={t}>
                                        <input
                                            type="radio"
                                            name="theme-dropdown"
                                            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                            aria-label={t}
                                            value={t}
                                            defaultChecked={
                                                localStorage.getItem(
                                                    "theme"
                                                ) === t
                                            }
                                            onChange={handleChange}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
