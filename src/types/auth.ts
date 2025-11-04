export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    fullName: string;
    email: string;
    isTwoFactorEnabled: boolean;
    token: string;
  };
  message: string;
  isSuccess: boolean;
}
export interface RegisterRequest {
  username: string;
  email: string;
  fullname: string;
  roleid:number;
  passswordHash: string;
}

export interface RegisterResponse {
  statusCode: number;
  data: number; // UserId return hota hai (jaise 11)
  message: string;
  isSuccess: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  token: string;
}

export interface ApiError {
  statusCode?: number;
  message: string;
  isSuccess: boolean;
}

export interface JWTPayload {
  primarysid: string;
  unique_name: string;
  nameid: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}
