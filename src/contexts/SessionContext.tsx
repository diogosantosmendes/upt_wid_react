import { useCallback, useState, type ReactNode } from "react";
import { createContext } from "react-router-dom";

interface SessionContextValue {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    startLogin: () => void;
    onLoginCompleted: (token: string) => void;
    onLoginFailure: (message: string) => void;
    logout: () => void;
}

export const SessionContexct = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({children}: {children: ReactNode}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<boolean | null>(null);

    const startLogin = useCallback(()=>{
        setIsLoading(true);
        setError(null);
    }, []);

    const onLoginCompleted = useCallback((token:string)=>{
        setIsLoading(false);
        setError(null);
    }, []);
}