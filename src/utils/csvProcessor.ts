import Papa from 'papaparse';

export const processCSVFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const products = results.data.map((row: any) => ({
          title: row['Name'] || '',
          description: row['Description'] || '',
          price: parseFloat(row['Price'] || row['price'] || '0'),
          sale_price: parseFloat(row['Sale price'] || '0') || null,
          inventory: parseInt(row['Inventory'] || '0'),
          sku: row['SKU'] || '',
          featured: row['Is Featured Product?']?.toLowerCase() === 'yes',
          visibility: row['Catalog Visibility'] || 'visible',
          external_url: row['Outer Link'] || null,
          button_text: row['Button'] || null,
          order_index: parseInt(row['Position'] || '0'),
          attribute_1_name: row['Attribute 1 Name'] || null,
          attribute_1_value: row['Attribute 1 Value'] || null,
          attribute_1_visible: row['Attribute 1 Visible']?.toLowerCase() === 'yes',
          attribute_1_global: row['Attribute 1 Global']?.toLowerCase() === 'yes',
          attribute_2_name: row['Attribute 2 Name'] || null,
          attribute_2_value: row['Attribute 2 Value'] || null,
          attribute_2_visible: row['Attribute 2 Visible']?.toLowerCase() === 'yes',
          attribute_2_global: row['Attribute 2 Global']?.toLowerCase() === 'yes',
          image_url: row['Picture'] || null,
          categories: row['Tag'] ? row['Tag'].split(',').map((cat: string) => cat.trim()) : [],
        }));
        
        console.log('Processed products:', products);
        resolve(products);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        reject(error);
      }
    });
  });
};