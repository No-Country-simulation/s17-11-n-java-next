export interface DataLogin {
    email: string
    password: string
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


export interface DepartamentsRequest {
    id?:number
}

//interface Request para el filter 

export interface ServicesFiltersRequest {
    id?: number;
    name?:string;
    page?:number;
    pageSize?: number;
}

// Actualizar los datos profile

export interface DataUpdateProfile {
    name: string;
    lastname: string;
    email?: string;
    phone?: string;
    departamento_id?: number;
    password?: string;
    profileImage?: File;
    dniFrontImage?: File;
    dniBackImage?: File;
}

