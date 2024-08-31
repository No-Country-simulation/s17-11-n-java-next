// endpoint login de prueba
import { codeToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

// interface de entrada
interface Data {
    email: string
    password: string
}

// interface Use
interface UserTest {
    id: string
    email: string
    name: string
    last_name: string
    password: string
    status: boolean
    role: string
}

//usurio finticio
const user: UserTest = {
    id: '1',
    email: 'retruco@retruco.com',
    name: 'name_test',
    last_name: 'lastName_test',
    password: 'retruco',
    status: true,
    role: 'user'
}

export async function POST(req: NextRequest) {
    try {
        const data: Data = await req.json()
        if (data.email !== user.email || data.password !== user.password)
            return NextResponse.json({ mensaje: 'Error al iniciar Session' }, { status: 400 })
        const token = await codeToken(user)

        return NextResponse.json({ token }, { status: 200 })
    } catch (error) {
        console.log(error)

        return NextResponse.json({ mensaje: error }, { status: 500 })
    }
}