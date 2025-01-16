interface UserInterface {
  nameUser: string;
  firstlastnameUser: string;
  secondLastnameUser?: string;
  emailUser: string;
  phoneUser: string;
  passwordUser: string;
  roleUser: string;
  stateUser: boolean;
  damageCount: number;
  tempDisabledUntil?: Date;
}
export default UserInterface;
