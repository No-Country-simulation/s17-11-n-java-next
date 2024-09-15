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
    data:    DataVerifyTokenResponse;
    success: boolean;
}

export interface DataVerifyTokenResponse {
    email:      string;
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


// Response Gets, para los filtros // Filters

export interface ServicesFiltersResponse {
    message: string;
    data:    DataServicesFilters;
    success: boolean;
}

export interface DataServicesFilters {
    content:       ContentDataServicesFilters[];
    currentPage:   number;
    totalPages:    number;
    totalElements: number;
    isFirst:       boolean;
    isLast:        boolean;
    pageSize:      number;
}

export interface ContentDataServicesFilters {
    id:           number;
    title:        string;
    description:  string;
    rules:        string;
    imgUrl:       null | string;
    user:         UserDataServicesFilters;
    departamento?: DepartamentoDataServicesFilters | null ;
    provincia:    ProvinciaDataServicesFilters | null;
    category:     CategoryDataServicesFilters;
    days:         number[];
    shiftTime:    number[];
}

export interface CategoryDataServicesFilters {
    id:   number;
    name: string;
}

export interface ProvinciaDataServicesFilters {
    id:   number;
    name: string;
}

export interface DepartamentoDataServicesFilters {
    id:   number;
    name: string;
}

export interface UserDataServicesFilters {
    id:       number;
    username: string;
}

// servicio por id

export interface ServiceForIdResponse {
    message: string;
    data:    DataServiceForIdResponse;
    success: boolean;
}

export interface DataServiceForIdResponse {
    id:           number;
    title:        string;
    description:  string;
    rules:        string;
    imgUrl:       string;
    user:         UserServiceForIdResponse;
    departamento: CategoryServiceForIdResponse;
    provincia:    CategoryServiceForIdResponse;
    category:     CategoryServiceForIdResponse;
    days:         number[];
    shiftTime:    number[];
}

export interface CategoryServiceForIdResponse {
    id:   number;
    name: string;
}

export interface UserServiceForIdResponse {
    id:       number;
    username: string;
}
