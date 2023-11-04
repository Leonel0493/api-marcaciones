import { DataTypes, Model } from "sequelize";
import { IDocument } from "../../../Catalogs_CRUD/Documents/Domain/IDocument";
import _ResourcesDB from "../Infra/resourcesDbConnection";

abstract class DocumentDBModel extends Model<IDocument> {
  id!: string;
  document!: string;
  parttern!: string | null;
  id_country!: string;
  created_by!: string;
  created_at!: Date;
  modifed_by!: string | null;
  modified_at!: Date | null;
  enabled!: boolean;
}

class _Documents extends DocumentDBModel {}

_Documents.init(
  {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    parttern: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    id_country: {
      type: DataTypes.STRING(50),
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
    tableName: "documents",
    modelName: "_Documents",
    timestamps: false,
  }
);

export default _Documents;
