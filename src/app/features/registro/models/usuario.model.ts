export interface Usuario {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  status?: number
}

export interface RegistroResponse {
  status: number;
  timestamp?: string;
  path?: string;
  userrorer?: string;
  requestId?: string
}
