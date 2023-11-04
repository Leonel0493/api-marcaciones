export interface IDocument {
  id: string;
  document: string;
  parttern: string | null;
  id_country: string;
  created_by: string;
  created_at: Date;
  modifed_by: string | null;
  modified_at: Date | null;
  enabled: boolean;
}

export interface IUpdateDocument {
  document: string;
  parttern: string | null;
  id_country: string;
  modified_by: string;
}
