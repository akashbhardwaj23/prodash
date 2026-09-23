export interface LoginRequest {
    username : string
    password : string
}

export interface LoginResponse {
    id : string
    username : string
    email : string
    firstName : string
    lastName : string
    gender : 'M' | 'F'
    image : string
    accessToken : string
    refreshToken : string
}