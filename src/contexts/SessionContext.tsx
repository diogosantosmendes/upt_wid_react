import { useCallback, useState, createContext, type ReactNode } from "react";
import { setIdToken } from "../services/configs";

export interface SessionUser {
    sub: string;
    provider: string;
    name?: string;
    email?: string;
    picture?: string;
}

interface SessionContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    user: SessionUser | null;
    startLogin: () => void;
    onLoginCompleted: (user: SessionUser, token: string) => void;
    onLoginFailure: (message: string) => void;
    logout: () => void;
}

export const SessionContexct = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<SessionUser | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startLogin = useCallback(() => {
        setIsLoading(true);
        setError(null);
    }, []);

    const onLoginCompleted = useCallback((user: SessionUser, token: string) => {
        setUser(user);
        setError(null);
        setIdToken(token);
        setIsLoading(false);
    }, []);

    const onLoginFailure = useCallback((message: string) => {
        setError(message);
        setIsLoading(false);
    }, []);

    const logout = useCallback(() => {
        setError(null);
        setUser(null);
        setIdToken(null);
        setIsLoading(false);
    }, []);

    return (
        <SessionContexct value={{
            isAuthenticated: user !== null,
            isLoading, user, error, startLogin, onLoginCompleted, onLoginFailure, logout
        }}>
            {children}
        </SessionContexct>
    );
}