import { Product } from "./product.model";
export class Image {
  constructor(
    public id?: number,
    public name?: string,
    public location?: string,
    public product?: Product

  ){}
}
