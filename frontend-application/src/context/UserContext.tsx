import { Context, createContext, useContext } from "react";
import React from "react";

interface IUserContext {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
}

const defaultContext: IUserContext = {
  userId: "",
  setUserId: (_userId) => {},
  isLoggedIn: false,
};

export const UserContext: Context<IUserContext> = createContext(defaultContext);

interface IApplicationProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<IApplicationProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = React.useState<string>(
    localStorage.getItem("SE_USER_ID") ?? ""
  );
  const handleSetUserId: (userId: string) => void = (userId) => {
    localStorage.setItem("SE_USER_ID", userId);
    setUserId(userId);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId: handleSetUserId,
        isLoggedIn: !!userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
