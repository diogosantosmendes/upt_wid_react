import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">UPT WID</Link>

                <button
                    className="navbar-toggler"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbarContent" className={`collapse navbar-collapse ${isOpen ? 'show' : ''} d-flex flex-row-reverse`}>
                    <button className="btn btn-outline-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        {theme}
                    </button>
                </div>
            </div>
        </nav>
    );
}