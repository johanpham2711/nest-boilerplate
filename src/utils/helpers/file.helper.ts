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

  static exportToExcel(data: any[]): Buffer {
    const MAX_CELL_LENGTH = 32767; // Excel cell text limit

    // Ensure all text values do not exceed the limit
    const truncatedData = data.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          typeof value === 'string' && value.length > MAX_CELL_LENGTH
            ? value.slice(0, MAX_CELL_LENGTH) // Truncate long text
            : value,
        ]),
      ),
    );
    // Convert data to worksheet
    const worksheet = xlsx.utils.json_to_sheet(truncatedData);

    // Create workbook and append sheet
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Suppliers');

    // Convert workbook to buffer
    return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }
}
