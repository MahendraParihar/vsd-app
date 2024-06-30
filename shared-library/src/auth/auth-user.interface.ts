export interface ILogin {
  userName: string;
  password: string;
}

export interface IAuthUser {
  adminUserId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  profilePicture: object;
  countryCode: string;
  contactNumber: string;
}
