import jwt from "jsonwebtoken";

const secretJWT = process.env.NEXTAUTH_SECRET as string;
const algorit: jwt.Algorithm = 'HS256';

interface User {
    id: string
    email: string
    name: string
    last_name: string
    password: string
    status: boolean
    role: string
}

export async function codeToken(user: User) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 7,
        id: user.id,
        name: user.name ?? '',
        last_name: user.last_name ?? '',
        status: user.status,
        email: user.email,
        role: user.role,
    },
        secretJWT,
        { algorithm: algorit }
    );
}

// el back una vez ingrese

interface RespDecoToken {
    exp: number,
    id: string,
    name: string,
    last_name: string,
    status: boolean,
    email: string,
    role: string
}
export async function decoToken(token: string) {
    try {
        const data = jwt.verify(token, secretJWT) as RespDecoToken;
        //console.log('asi esta llegando el token a la decotoken', token);
        return data;
    } catch (error) {
        //console.error('Error al decodificar el token:', error);
        throw new Error('Token inválido');
    }
}