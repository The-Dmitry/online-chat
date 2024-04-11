import { AllMessagesResponse } from './AllMessagesResponse';
import { AllUsersResponse } from './AllUsersResponse';
import { ExternalAuthResponse } from './ExternalAuthResponse';
import { LoginResponse } from './LoginResponse';
import { LogoutResponse } from './LogoutResponse';
import { MessageDeliveryStatus } from './MessageDeliveryStatus';
import { MessageReadStatus } from './MessageReadStatus';
import { MessageResponse } from './MessageResponse';

export type ResponsesList =
  | LoginResponse
  | LogoutResponse
  | AllMessagesResponse
  | AllUsersResponse
  | MessageResponse
  | ExternalAuthResponse
  | MessageDeliveryStatus
  | MessageReadStatus;
