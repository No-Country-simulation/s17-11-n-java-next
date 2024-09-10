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