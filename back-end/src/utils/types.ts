export interface User {
  status: boolean;
  data: {
    email: string;
    name: string;
    username: string;
  };
}

export interface GenericResponse {
  status: boolean;
  message: string;
}

export interface UserResponse {
  status: boolean;
  user: {
    _id: string;
    email: string;
    name: string;
    picture: string
  };
  serviceToken: string | boolean;
}