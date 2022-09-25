export type Nullable<T> = T | null;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface FileType extends File {
  preview?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  googleId?: Nullable<string>;
  githubId?: Nullable<string>;
  provider?: Nullable<string>;
  avatar: string;
  userInfo?: Nullable<string>;
}

export interface UserResponse {
  code?: number;
  message?: string;
  accessToken?: string;
  user: User;
}
