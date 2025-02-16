import * as xlsx from 'xlsx';

export class FileHelper {
  static processExcel(buffer: Buffer): {
    companyName: string;
    countryCode: string;
  }[] {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const suppliersList = jsonData
      .map((row: any) => {
        const companyName = row['Company Name'];
        const countryCode = row['Country Code'];
        return { companyName, countryCode };
      })
      .filter(Boolean);

    return suppliersList;
  }
}
