export type LoginResponse = {
    message: string
    data: {
        token?: string
        role: string
    },
    success: boolean
};

export type RegisterResponse = {
    message: string;
    data: {
        id?: number;
        name?: string;
        last_name?: string;
        email?: string;
        createdAt?: string;
        role: {
            id?: number;
            name?: string;
        };
    };
    success: boolean;
};


export type ResendEmailResponse = {

        message: string,
        data: {
            email: string,
            message: string
        },
        success: true
}

// verificar token
export type VerifyTokenResponse = {
    message:string
    
}
