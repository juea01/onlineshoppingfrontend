export interface RedirectApiResponse {
  url: string;
  statusCode: number;
  redirectView: {
    url: string;
    statusCode: number;
  }
}
