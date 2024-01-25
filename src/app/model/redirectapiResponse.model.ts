export interface RedirectApiResponse {
  url: string;
  redirectView: {
    url: string;
    statusCode: number;
  }
}
