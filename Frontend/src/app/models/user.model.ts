export interface IUser {
  id: number;
  username: string;
}

export class User implements IUser {
  constructor(
    public id = 0,
    public username = 'Kofi Owusu-Afriyie'
  ) { }

}
