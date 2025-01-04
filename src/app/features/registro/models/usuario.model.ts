export interface Usuario {
  fullName: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface RegistroResponse {
  success: boolean;
  message?: string;
  user?: Usuario;
}
