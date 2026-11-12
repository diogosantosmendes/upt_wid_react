import { useContext } from "react";
import { SessionContexct } from "../contexts/SessionContext";

export function useSession() {
    const context = useContext(SessionContexct);

    if(!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}