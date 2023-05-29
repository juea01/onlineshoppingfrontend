
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
  public emailPromotion: boolean;
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

  constructor(id?: number,firstname?: string, lastname?: string, name?: string, mobileNumber?: string, email?: string,  password?: string,role?: string,
       authStatus?:string, emailPromotion?:boolean, address?: string, city?: string, state?: string, country?: string, postalCode?: number, ageAboveEighteen?: boolean, gender?: string,
       occupation?: string, acceptTermsConditions?: boolean, enabled?: number){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = name;
        this.phone = mobileNumber;
        this.email = email;
        this.password = password;
        this.role = role;
        this.authStatus = authStatus;
        this.emailPromotion = emailPromotion;

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
  }

}
