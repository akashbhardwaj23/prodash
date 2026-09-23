import api from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/auth";


export const loginUser = async (
    credentials : LoginRequest
) : Promise<LoginResponse> => {
    const response = await api.post("/auth/login",
        credentials
    );
    return response.data;
}