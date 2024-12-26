import { DOMParser } from '@xmldom/xmldom';
import { saveAs } from 'file-saver';

interface WordPressProduct {
  title: string;
  description: string;
  regularPrice: string;
  salePrice: string;
  sku: string;
  stock: string;
  categories: string[];
  attributes: {
    name: string;
    value: string;
    visible: boolean;
    global: boolean;
  }[];
  images: string[];
  weight: string;
  length: string;
  width: string;
  height: string;
  taxStatus: string;
  taxClass: string;
}

export const convertWordPressXMLToCSV = (xmlFile: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const xmlContent = event.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
        
        console.log('Parsing WordPress XML file...');
        
        // Get all product items
        const items = xmlDoc.getElementsByTagName('item');
        const products: WordPressProduct[] = [];
        
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const postType = item.getElementsByTagName('wp:post_type')[0]?.textContent;
          
          if (postType === 'product') {
            const product: WordPressProduct = {
              title: item.getElementsByTagName('title')[0]?.textContent || '',
              description: item.getElementsByTagName('content:encoded')[0]?.textContent || '',
              regularPrice: item.getElementsByTagName('regular_price')[0]?.textContent || '',
              salePrice: item.getElementsByTagName('sale_price')[0]?.textContent || '',
              sku: item.getElementsByTagName('sku')[0]?.textContent || '',
              stock: item.getElementsByTagName('stock')[0]?.textContent || '',
              categories: [],
              attributes: [],
              images: [],
              weight: item.getElementsByTagName('weight')[0]?.textContent || '',
              length: item.getElementsByTagName('length')[0]?.textContent || '',
              width: item.getElementsByTagName('width')[0]?.textContent || '',
              height: item.getElementsByTagName('height')[0]?.textContent || '',
              taxStatus: item.getElementsByTagName('tax_status')[0]?.textContent || '',
              taxClass: item.getElementsByTagName('tax_class')[0]?.textContent || '',
            };
            
            // Get categories
            const categories = item.getElementsByTagName('category');
            for (let j = 0; j < categories.length; j++) {
              if (categories[j].getAttribute('domain') === 'product_cat') {
                product.categories.push(categories[j].textContent || '');
              }
            }
            
            // Get attributes
            const attributes = item.getElementsByTagName('attribute');
            for (let j = 0; j < attributes.length; j++) {
              const attr = attributes[j];
              product.attributes.push({
                name: attr.getAttribute('name') || '',
                value: attr.textContent || '',
                visible: attr.getAttribute('visible') === '1',
                global: attr.getAttribute('global') === '1',
              });
            }
            
            // Get images
            const images = item.getElementsByTagName('wp:attachment_url');
            for (let j = 0; j < images.length; j++) {
              product.images.push(images[j].textContent || '');
            }
            
            products.push(product);
          }
        }
        
        console.log('Converted products:', products);
        
        // Convert to CSV format
        const headers = [
          'Name',
          'Description',
          'Regular price',
          'Sale price',
          'Stock',
          'SKU',
          'Categories',
          'Picture',
          'Weight (kg)',
          'Length (cm)',
          'Width (cm)',
          'Height (cm)',
          'Tax status',
          'Tax class',
          'Attribute 1 Name',
          'Attribute 1 Value',
          'Attribute 1 Visible',
          'Attribute 1 Global',
          'Attribute 2 Name',
          'Attribute 2 Value',
          'Attribute 2 Visible',
          'Attribute 2 Global',
        ].join(',');
        
        const rows = products.map(product => [
          `"${product.title.replace(/"/g, '""')}"`,
          `"${product.description.replace(/"/g, '""')}"`,
          product.regularPrice,
          product.salePrice,
          product.stock,
          product.sku,
          `"${product.categories.join(',')}"`,
          product.images[0] || '',
          product.weight,
          product.length,
          product.width,
          product.height,
          product.taxStatus,
          product.taxClass,
          product.attributes[0]?.name || '',
          product.attributes[0]?.value || '',
          product.attributes[0]?.visible ? 'yes' : 'no',
          product.attributes[0]?.global ? 'yes' : 'no',
          product.attributes[1]?.name || '',
          product.attributes[1]?.value || '',
          product.attributes[1]?.visible ? 'yes' : 'no',
          product.attributes[1]?.global ? 'yes' : 'no',
        ].join(','));
        
        const csvContent = `${headers}\n${rows.join('\n')}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'wordpress_products.csv');
        
        resolve();
      } catch (error) {
        console.error('Error converting WordPress XML:', error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading XML file'));
    };
    
    reader.readAsText(xmlFile);
  });
};