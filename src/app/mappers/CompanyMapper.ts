import { Company } from "../interfaces/Company";

export class CompanyMapper {
  public static mapperCompany(data: any): Company {
    let option: Company = null;
    if (data) {
      option = {
        id: data.refId,
        param: data.param,
        idCountry: data?.country?.refId || '',
        description: data?.empresaDescription || '',
        empresaCode: data.empresaCode || '',
        order: data?.order || ''
      };
    }
    return option;
  }

  public static mapperCompanies(data: any): Company[] {
    return data.map((item: any) => {
      return this.mapperCompany(item?.empresa);
    });
  }

}
