import { Image } from "./image.model";
export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public category?: string,
    public suitableAudience?: string,
    public features?: string,
    public description?: string,
    public sellerLink?: string,
    public images?: Image[],
    public publishDate?: Date,
    public lastEditDate?: Date
  ){}
}
