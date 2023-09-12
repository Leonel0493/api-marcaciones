import { Id } from "../../../Shared/Domain/Id";
import { IProvince } from "./IProvince.";
import { Province } from "./Province";

export interface ProvinceRepository {
  getAll(): Promise<IProvince[]>;
  searchByProvinceId(id: Id): Promise<IProvince | null>;
  searchByCountry(idCountry: Id): Promise<IProvince[] | null>;
  save(province: Province): Promise<IProvince>;
  update(province: Province): Promise<IProvince>;
  delete(province: Province): Promise<boolean>;
}
