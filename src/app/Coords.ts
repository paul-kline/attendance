export class Coords {
  public lat: number;
  public lng: number;
  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    return;
  }
  static mkCoords(obj): Coords {
    return new Coords(obj.lat, obj.lng);
  }
  toGeneric() {
    return Object.assign({}, this);
  }
  static fromGeneric(obj: {}) {
    return Coords.mkCoords(obj);
  }
  toString() {
    return this.lat + "," + this.lng;
  }
}
