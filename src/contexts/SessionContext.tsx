'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type SessionContextType = {
  setSessionExpiringStatus: (status: boolean) => void;
  getSessionExpiringStatus: () => boolean;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [isSessionExpired, setSessionExpired] = useState<boolean>(false);

  const setSessionExpiringStatus = (status: boolean) => {
    setSessionExpired(status);
  };

  const getSessionExpiringStatus = () => {
    return isSessionExpired;
  };

  return (
    <SessionContext.Provider
      value={{ setSessionExpiringStatus, getSessionExpiringStatus }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
};
