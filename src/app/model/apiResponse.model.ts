export class ApiResponse<T> {
  public message?: string;
  public data?: T;
  constructor(message?: string, data?: T) {
    this.message = message;
    this.data = data;
  }
}
