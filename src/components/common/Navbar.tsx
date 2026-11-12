import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useSession } from "../../hooks/useSession";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { isLoading, user, logout } = useSession();

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

                <div id="navbarContent" className={`collapse navbar-collapse ${isOpen ? 'show' : 'd-none'} d-flex flex-row-reverse`}>
                    {isLoading? (
                        <span className="text-body-secondary">Loading session...</span>
                    ): (
                        <div className="gap-2">
                            <span className="text-body-secondary me-2">{user?.name ?? user?.email}</span>
                            <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
                        </div>
                    )}
                    <button className="btn btn-outline-primary me-2" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                        {theme}
                    </button>
                </div>
            </div>
        </nav>
    );
}