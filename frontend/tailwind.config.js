import daisyui from "daisyui";
import { themes } from "./src/utils/constants.js";

export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
    plugins: [daisyui],
    daisyui: {
        themes: themes,
        darkTheme: "dark",
    },
};
