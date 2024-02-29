import { BaseURL } from "./BaseURL";

// Get
export const GetTicketsById = `${BaseURL}/tickets/id?`;
export const GetTicketsByUserId = `${BaseURL}/tickets/user?`;

// Post
export const PostTickets = `${BaseURL}/tickets/`;

// Put
export const UpdateTicketsById = `${BaseURL}/tickets/id?`;

// Delete
export const DeleteTicketsById = `${BaseURL}/tickets/id?`;
