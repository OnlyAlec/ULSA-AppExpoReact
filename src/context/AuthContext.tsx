import { createContext, useMemo, useState, type ReactNode } from "react";

export interface UserData {
  id?: number;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  profilePhotoUrl?: string;
}

export interface AuthData {
  user: UserData | null;
  credits?: number;
  experience?: number;
  error?: { code?: string; message?: string };
}

export interface SessionContextValue {
  sessionData: AuthData | null;
  setSessionData: (data: AuthData | null) => void;
}

const defaultValue: SessionContextValue = {
  sessionData: null,
  setSessionData: () => {
    throw new Error("AuthProvider is missing in the component tree.");
  },
};

export const AuthContext = createContext<SessionContextValue>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionData, setSessionData] = useState<AuthData | null>(null);

  const value = useMemo(
    () => ({ sessionData: sessionData, setSessionData }),
    [sessionData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
