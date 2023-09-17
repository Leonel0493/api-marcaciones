import { DataTypes, Model } from "sequelize";
import { ICity } from "../../../Catalogs_CRUD/City/Domain/ICity";
import _ResourcesDB from "../Infra/resourcesDbConnection";

abstract class CityDBModel extends Model<ICity> {
  id!: string;
  city!: string;
  id_province!: string;
  created_by!: string;
  created_at!: Date;
  modifed_by!: string | null;
  modified_at!: Date | null;
  enabled!: boolean;
}

class _Cities extends CityDBModel {}

_Cities.init(
  {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_province: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modifed_by: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: _ResourcesDB,
    tableName: "cities",
    modelName: "_Provinces",
    timestamps: false,
  }
);
