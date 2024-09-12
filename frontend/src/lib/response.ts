export type LoginResponse = {
    message: string
    data: {
        token?: string
        role: string
    }
    success: boolean
}

export type RegisterResponse = {
    message: string
    data: {
        id?: number
        name?: string
        last_name?: string
        email?: string
        createdAt?: string
        role: {
            id?: number
            name?: string
        }
    }
    success: boolean
}

export interface ProfileResponse {
    message: string
    data: {
        id: number
        profileImageUrl: string
        dniFrontUrl: string
        dniBackUrl: string
        phone: string
        departamento: string
        provincia: string
        name: string
        lastname: string
        email: string
    }
    success: boolean
}
