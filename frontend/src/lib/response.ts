export type LoginResponse = {
    message: string
    data: {
        token?: string;
        role: string;
        id: number;
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
    message: string
    data: {
        email: string
        isVerified: boolean
    },
    success: true
}

//
// Provincias

export type ProvinciasResponse = {
    message: string;
    data: {
        id: number;
        name: string;
    }[];
    success: boolean;
};


// Categorias

export type CategorysResponse = {
    message: string;
    data:{
        id:number;
        name:string;
    }[];
    success: boolean;
}

//Departamento

export type DepartamentsResponse = {
    id: number;
    name: string;
}[];


// Response de Profile

export type ProfileResponse = {
    message: string;
    data:    DataProfileResponse;
    success: boolean;
}

export interface DataProfileResponse {
    name:            string;
    lastname:        string;
    email:           string;
    phone?:           string;
    provincia?:       string;
    departamento?:    string;
    profileImageUrl?: string;
    dniFrontUrl?:     string;
    dniBackUrl?:      string;
}