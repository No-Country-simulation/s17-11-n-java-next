import NextAuth, { AuthOptions } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decoToken } from "@/lib/token";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
console.log(API)


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "retruco@retruco.com" },
                password: { label: "Password", type: "password", placeholder: "retruco" },
            },
            async authorize(credentials, req) {
                try {
                    const response = await fetch(`${API}/api/login`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const user = await response.json();
                    if (response.ok && user) {
                        //console.log('respuesta del login',user)
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error en authorize:", error);
                    return null;
                }
            },
        }),
    ],
    //para ver por consola la respuesta
    //debug: process.env.NODE_ENV !== "production",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user; 
            }
            //console.log('esto es el token jwt',token)
            //console.log("User in JWT:", user);
            return {...token, ...user};
        },
        async session({ session, token }) {
            try {
                const jwtToken = typeof token.token === 'string' ? token.token : JSON.stringify(token.token);
                const data = await decoToken(jwtToken);

                if (data) {
                    session.user.id = data.id;
                    session.user.email = data.email;
                    session.user.name = data.name;
                    session.user.last_name = data.last_name;
                    session.user.status = data.status;
                    session.user.role = data.role;
                }
                //console.log('esto es la session', session);
                return session;
            } catch (error) {
                //console.error("Error en session callback:", error);
                return session;
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    // pages:{
    //     signIn:'/auth/login',
    // }
}
// linea debug en desarrollo

