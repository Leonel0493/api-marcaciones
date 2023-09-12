import { Id } from "../../../Shared/Domain/Id";
import { InvalidArgumentError } from "../../../Shared/Domain/InvalidArgumentError";
import { Province } from "../Domain/Province";
import { ProvinceRepository } from "../Domain/ProvinceRepository";
import { Search } from "./Search";

export class Delete {
  constructor(private readonly repository: ProvinceRepository) {}

  async Delete(id: string): Promise<boolean> {
    const idProvince = new Id(id);
    const search = new Search(this.repository);
    const foundProvince = await search.SearchById(idProvince.id);

    if (foundProvince === null)
      throw new InvalidArgumentError(
        "Lo siento la provincia que deseas eliminar no existe"
      );

    const deletedProvince = new Province(foundProvince);

    deletedProvince.DisableProvince();

    return this.repository.delete(deletedProvince);
  }
}
