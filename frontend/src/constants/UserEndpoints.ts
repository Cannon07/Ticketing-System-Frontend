import { BaseURL } from "./BaseURL";

// Get
export const GetUserById = `${BaseURL}/users/id?id=`;
export const GetUserByWalletId = `${BaseURL}/users/registration?walletId=`;

// Post
export const PostUser = `${BaseURL}/users/`;

// Put
export const UpdateUserById = `${BaseURL}/users/id?id=`;

// Delete
export const DeleteUserById = `${BaseURL}/users/delete/id?id=`;

