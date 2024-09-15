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