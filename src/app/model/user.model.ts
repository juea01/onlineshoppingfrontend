
export class User{

  public id: number;
  public firstname: string;
  public lastname: string;
  public username: string;
  public phone: string;
  public email : string;
  public password: string;
  public role : string;
  public authStatus : string;
  public emailSubscription: boolean;
  public acceptTermsConditions: boolean;

  public address: string;
  public city: string;
  public state: string;
  public country: string;
  public postalCode: number;

  public above18: boolean;
  public occupation: string;
  public gender: string;
  public enabled: number;

  public passwordResetCode: string;
  public emailConfirmCode: string;

  constructor(id?: number,firstname?: string, lastname?: string, name?: string, mobileNumber?: string, email?: string,  password?: string,role?: string,
       authStatus?:string, emailSubscription?:boolean, address?: string, city?: string, state?: string, country?: string, postalCode?: number, ageAboveEighteen?: boolean, gender?: string,
       occupation?: string, acceptTermsConditions?: boolean, enabled?: number,
       passwordResetCode?: string, emailConfirmCode?: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = name;
        this.phone = mobileNumber;
        this.email = email;
        this.password = password;
        this.role = role;
        this.authStatus = authStatus;
        this.emailSubscription = emailSubscription;

        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.postalCode = postalCode;

        this.above18 = ageAboveEighteen;
        this.gender = gender;
        this.occupation = occupation;
        this.acceptTermsConditions = acceptTermsConditions;
        this.enabled = enabled;

        this.emailConfirmCode = emailConfirmCode;
        this.passwordResetCode = passwordResetCode;
  }

}
