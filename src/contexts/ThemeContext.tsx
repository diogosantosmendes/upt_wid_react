import { createContext, useEffect, useState } from "react";
import type { Theme } from "../types/Theme";

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        // Synchronizes directly with Bootstrap's theme attribute on the HTML element
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <ThemeContext value={{ theme, setTheme }}>
            {children}
        </ThemeContext>
    );
}