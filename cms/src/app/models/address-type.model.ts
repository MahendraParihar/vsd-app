export class AddressTypeModel {
  id?: number;
  name?: string;

  static fromJson(data: any): AddressTypeModel | null {
    if (!data) {
      return null;
    }
    const obj: AddressTypeModel = new AddressTypeModel();
    obj.id = data.id;
    obj.name = data.name;
    return obj;
  }
}
