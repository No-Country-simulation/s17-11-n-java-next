export type LoginResponse = {
    message: string
    data: {
        token?: string
        role: string
    },
    success: boolean
};