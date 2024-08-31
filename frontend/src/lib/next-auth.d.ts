import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        token: string;
        user: {
            exp: number,
            id: string | null,
            name: string | null,
            last_name: string | null,
            status: bollean ,
            email: string | null,
            role: string | null,
            iat: number | null
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        token:string
    }
}