export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  data: {
    Id : string;
    fullName: string;
    email: string;
    RoleName : string;
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
  Id?: number;
  fullName: string;
  email: string;
  RoleName : string;
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
  email?: string; // Optional, some tokens may include email
  RoleName?: string; // Optional, some tokens may include role
}
