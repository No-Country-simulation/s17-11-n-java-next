"use client";

import { SessionProvider } from "next-auth/react";

interface Props {
    children: React.ReactNode;
    session: any;
}

const SessionAuthProvider = ({ children, session }: Props) => {
    return <SessionProvider session={session} refetchInterval={5 * 60}>{children}</SessionProvider>;
};

export default SessionAuthProvider;