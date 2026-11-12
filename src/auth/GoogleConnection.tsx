import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from "@react-oauth/google";
import type { OAuthConnectionProps } from "./OAuthConnectionProps.ts";
import type { SessionUser } from "../contexts/SessionContext.tsx";

function parseSessionUsersFromIdToken(idToken: string): SessionUser {
    if (!idToken) {
        throw new Error("Empty ID token received from Google.");
    }
    const encodedPayload = idToken.split(".")[1];
    if (!encodedPayload) {
        throw new Error("Invalid ID token format from Google.");
    }

    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    return {
        sub: payload.sub,
        provider: "google",
        name: payload.name,
        email: payload.email,
        picture: payload.picture
    };
}

export default function GoogleConnection(props: OAuthConnectionProps) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    const handleSuccess = (response: CredentialResponse) => {
        try {
            if (!response.credential) {
                throw new Error("No credential received from Google.");
            }

            const user = parseSessionUsersFromIdToken(response.credential);
            props.onLoginSuccess(user, response.credential);
        } catch (cause) {
            props.onLoginFailure(cause instanceof Error ? cause.message : "Unknown error");
        }
    }

    if (!clientId) {
        return <div className="alert alert-danger" role="alert">
            Google sign not configured.
        </div>
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="position-relative d-flex justify-content-center w-100">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => props.onLoginFailure("Google sign-in failed. Try again later.")}
                    click_listener={props.onLoginStart}
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                />
                {((props.disabled || props.isLoading) &&
                    <button className="btn btn-primary position-absolute top-0 start-0 w-100 h-100" disabled>
                        {props.isLoading ? "Connecting to Google..." : "Continue with Google"}
                    </button>
                )}
            </div>
        </GoogleOAuthProvider>
    )
}