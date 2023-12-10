"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

//Interface for Session Provider
interface Props {
    children: ReactNode;
}
//Provider component manages session state
const Providers = (props: Props) => {
    return <SessionProvider>{props.children}</SessionProvider>;
}

export default Providers;