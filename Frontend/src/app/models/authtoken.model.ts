import { Controller } from './decorators';

export interface IAuthToken {
  unique?: number | string;
  username: string;
  password?: string;
  email: string;
  name: string;
  image: string,
  idToken: string;
  tokenType: string;
  expiresAt: number,
  deviceId: number,
  requestConfirmation: boolean,
}

@Controller({ name: 'AuthToken' })
export class AuthToken implements IAuthToken {
  constructor(
    public unique = 0,
    public username = '',
    public email = '',
    public name = '',
    public image = '',
    public idToken = '',
    public tokenType = 'Bearer',
    public expiresAt = 3600,
    public deviceId = 0,
    public requestConfirmation = false
  ) {

  }

}
