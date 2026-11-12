import type { SessionUser } from "../contexts/SessionContext";

export interface OAuthConnectionProps {
    isLoading: boolean;
    disabled: boolean;
    onLoginStart: () => void;
    onLoginSuccess: (user: SessionUser, token: string) => void;
    onLoginFailure: (message: string) => void;
}