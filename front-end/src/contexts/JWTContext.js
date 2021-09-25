import React, { createContext } from "react";

//-----------------------|| JWT CONTEXT & PROVIDER ||-----------------------//

const JWTContext = createContext({});

export const JWTProvider = ({ children }) => {
  return <JWTContext.Provider value={{}}>{children}</JWTContext.Provider>;
};

export default JWTContext;
