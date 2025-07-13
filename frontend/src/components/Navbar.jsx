// @ imports
import { Link } from "react-router";
import { ChevronDown, PlusIcon } from "lucide-react";
import { themes } from "../utils/constants.js";
import { bgEffects } from "../utils/constants.js";

// @ component
const Navbar = ({ setEffect }) => {
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
                        <Link
                            to={"/create"}
                            className="btn btn-primary btn-outline"
                        >
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>

                        <div className={`w-[1px] h-9 bg-gray-500`}></div>

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
