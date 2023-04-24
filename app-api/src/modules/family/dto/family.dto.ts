export interface IFamilyDto {
    id: number,
    firstName: number,
    middleName: number,
    lastName: number,
    cityVillageId: number,
    cityVillage: string,
    imagePath?: string,
    maritalStatusId?: number,
    maritalStatus?: string,
    dob?: string
}