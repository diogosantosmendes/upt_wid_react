import GoogleConnection from "../auth/GoogleConnection";
import { useSession } from "../hooks/useSession";

export default function LoginPage() {
    const { startLogin, onLoginCompleted, onLoginFailure, isLoading, error } = useSession();

    return (
        <main className="min-vh-100 d-flex align-items-center justify-content-center bg-body-tertiary p-3">
            <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <GoogleConnection 
                    disabled={isLoading}
                    isLoading={isLoading}
                    onLoginStart={startLogin}
                    onLoginSuccess={onLoginCompleted}
                    onLoginFailure={onLoginFailure}
                />
            </div>
        </main>
    )
}