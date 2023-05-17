
export class Subscription{

  public id: number;
  public firstname: string;
  public email : string;
  public emailVerified: boolean;



  constructor(id?: number, firstname?: string, email?: string,  emailVerified?:boolean){
        this.id = id;
        this.firstname = firstname;
        this.email = email;
        this.emailVerified = emailVerified;
  }

}
