import { Id } from "../../../Shared/Domain/Id";
import { City } from "./City";
import { ICity } from "./ICity";

export interface CityRepository {
  getAll: Promise<ICity[]>;
  searchById(id: Id): Promise<ICity>;
  searchByProvince(idProvince: Id): Promise<ICity[]>;
  save(city: City): Promise<ICity>;
  update(city: City): Promise<ICity>;
  delete(city: City): Promise<boolean>;
}
