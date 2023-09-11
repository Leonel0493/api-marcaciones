import { DataTypes, Model } from "sequelize";
import { ICointry } from "../../../Catalogs_CRUD/Country/Domain/ICountry";
import _ResourcesDB from "../Infra/resourcesDbConnection";

abstract class CountryDbModel extends Model<ICointry> {
  id!: string;
  country!: string;
  abbreviation!: string;
  flag_img!: Buffer | null;
  created_by!: string;
  created_at!: Date;
  modified_by!: string | null;
  modified_at!: Date | null;
  enabled!: boolean;
}

class _Country extends CountryDbModel {}

_Country.init(
  {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    abbreviation: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    flag_img: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    modified_by: {
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
    modelName: "_Country",
    tableName: "countries",
    timestamps: false,
  }
);

export default _Country;
