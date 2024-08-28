import React, { createContext, Suspense, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import IUserGetDto from "../interfaces/IUserGetDto";
import IResponse from "../interfaces/IResponse";

export const AuthContext = createContext<{
  user: IUserGetDto | null;
  setUser: (user: IUserGetDto | null) => void;
}>({
  user: null,
  setUser: () => {}
});

const PrivateRoute: React.FunctionComponent = (): React.ReactElement => {
  const response = useLoaderData() as IResponse<IUserGetDto | null>;
  const [user, setUser] = useState<IUserGetDto | null>(null);
  const value = { user, setUser };

  useEffect(() => {
    setUser(response?.result)
  }, [response])

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <AuthContext.Provider value={value}>
        <Outlet />
      </AuthContext.Provider>
    </Suspense>
  );
};

export default PrivateRoute;
