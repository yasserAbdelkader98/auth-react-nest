import { AxisInstance } from "./axiosConfig";

type User = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

//////////////////////////////////////////////// AUTH ///////////////////////////////////////////////
export const login = (body: User) => {
  return AxisInstance.post(
    `/auth/login`,
    body
  );
}

export const logout = () => {
  return AxisInstance.post(`/auth/logout`);
}

//////////////////////////////////////////////// USERS ///////////////////////////////////////////////
export const addUser = (body: User) => {
  return AxisInstance.post(
    `/users/register`,
    body,
  );
};

export const deleteUser = () => {
  return AxisInstance.delete(
    `/users/me`,
  );
};
