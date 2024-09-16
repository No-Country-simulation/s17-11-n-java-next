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

export interface VerifyTokenResponse {
    message: string;
    data: DataVerifyTokenResponse;
    success: boolean;
}

export interface DataVerifyTokenResponse {
    email: string;
    isVerified: boolean;
}



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
    data: {
        id: number;
        name: string;
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
    data: DataProfileResponse;
    success: boolean;
}

export interface DataProfileResponse {
    name: string;
    lastname: string;
    email: string;
    phone?: string;
    provincia?: string;
    departamento?: string;
    profileImageUrl?: string;
    dniFrontUrl?: string;
    dniBackUrl?: string;
}


// Response Gets, ServiciosResponse

export interface ServiciosResponse {
    message: string;
    data: DataServiciosResponse;
    success: boolean;
}

export interface DataServiciosResponse {
    content: ContentServiciosResponse[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
    isFirst: boolean;
    isLast: boolean;
    pageSize: number;
}

export interface ContentServiciosResponse {
    id: number;
    title: string;
    description: string;
    rules: string;
    imgUrl: null | string;
    user: UserDataServiciosResponse;
    departamento?: DepartamentoDataServiciosResponse | null;
    provincia: ProvinciaDataServiciosResponse | null;
    category: CategoryDataServiciosResponse;
    days: number[];
    shiftTime: number[];
}

export interface CategoryDataServiciosResponse {
    id: number;
    name: string;
}

export interface ProvinciaDataServiciosResponse {
    id: number;
    name: string;
}

export interface DepartamentoDataServiciosResponse {
    id: number;
    name: string;
}

export interface UserDataServiciosResponse {
    id: number;
    username: string;
}

// servicio por id

export interface ServiceForIdResponse {
    message: string;
    data: DataServiceForIdResponse;
    success: boolean;
}

export interface DataServiceForIdResponse {
    id: number;
    title: string;
    description: string;
    rules: string;
    imgUrl: string;
    user: UserServiceForIdResponse;
    departamento: CategoryServiceForIdResponse;
    provincia: CategoryServiceForIdResponse;
    category: CategoryServiceForIdResponse;
    days: number[];
    shiftTime: number[];
}

export interface CategoryServiceForIdResponse {
    id: number;
    name: string;
}

export interface UserServiceForIdResponse {
    id: number;
    username: string;
}

// todos los Servicios por id de usuario

export interface ServicieByUserResponse {
    message: string;
    data: Array<{
        id: number;
        title: string;
        description: string;
        rules: string;
        imgUrl: string | null;
        user: {
            id: number;
            username: string;
        };
        departamento: string | null;
        provincia: string | null;
        category: {
            id: number;
            name: string;
        };
        days: number[];
        shiftTime: string[];
    }>;
    success: boolean;
}
