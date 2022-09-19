import { User } from '.';

export abstract class BaseResponse {
  code?: string;
  message?: string;
}

export interface MessageResponse {
  id: string;
  message: string;
  receive: string;
  createdAt: string;
  updatedAt: string;
  sender: User;
}

export interface MessageResponseAPI extends BaseResponse {
  data: MessageResponse[];
}
