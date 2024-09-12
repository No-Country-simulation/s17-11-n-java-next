export interface DataLogin {
    email:string
    password:string
}

export interface DataRegister {
    name: string
    last_name: string
    email: string
    password: string
}

export interface DataVerifyToken {
    token: string
}