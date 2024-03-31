import { SsiBaseURL } from "./SsiBaseURL";

// Get
export const GetUserDetailsById = `${SsiBaseURL}/userDetails/id?id=`;

// Post
export const PostUserDetails = `${SsiBaseURL}/userDetails/?userId=`;
export const PostUserVCsFromUserDid = `${SsiBaseURL}/userDetails/availableVCs`;

// Put
export const UpdateUserDetails = `${SsiBaseURL}/userDetails/update/id?id=`;

