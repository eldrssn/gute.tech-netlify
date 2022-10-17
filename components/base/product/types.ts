enum Properties {
  manufacturer = 'manafacturer',
  vendor_code = 'vendor_code',
}

enum optionColumn {
  BRAND = 'brand',
  MODEL = 'model',
  YEAR = 'year',
  TRANSPORT = 'transport',
}

enum InstallationColumnNames {
  brandSlug = 'brandSlug',
  modelSlug = 'modelSlug',
  yearSlug = 'yearSlug',
  transportSlug = 'transportSlug',
}

type InstallationColumnName = keyof typeof InstallationColumnNames;

type optionColumnData = {
  name: InstallationColumnName;
  optionColumn: optionColumn;
  placeholder: string;
};

export type { optionColumnData };
export { Properties, optionColumn, InstallationColumnNames };
