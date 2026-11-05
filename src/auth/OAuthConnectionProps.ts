export interface OAuthConnectionProps {
    isLoading: boolean;
    disabled: boolean;
    onLoginStart: () => void;
    onLoginSuccess: (token: string) => void;
    onLoginFailure: (message: string) => void;
}