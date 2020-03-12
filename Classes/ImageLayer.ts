export interface IImageLayer {
  zeros: number;
  ones: number;
  twos: number;
  image: string;
}

export class ImageLayer implements IImageLayer {
  public zeros: number = 0;
  public ones: number = 0;
  public twos: number = 0;
  public image: string = "";
  constructor(image: string) {
    this.image = image;
    this.zeros = Array.from(image).filter(l => l == "0").length;
    this.ones = Array.from(image).filter(l => l == "1").length;
    this.twos = Array.from(image).filter(l => l == "2").length;
  }
}
