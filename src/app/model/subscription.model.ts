
export class Subscription{

  public id: number;
  public firstname: string;
  public email : string;
  public emailVerified: boolean;
  public acceptTermsConditions: boolean;
  public enabled: number;
  public emailConfirmCode: string;



  constructor(id?: number, firstname?: string, email?: string,  emailVerified?:boolean, acceptTermsConditions?: boolean,
    enabled?: number, emailConfirmCode?: string){
        this.id = id;
        this.firstname = firstname;
        this.email = email;
        this.emailVerified = emailVerified;
        this.acceptTermsConditions = acceptTermsConditions;
        this.enabled = enabled;
        this.emailConfirmCode = emailConfirmCode;
  }

}
