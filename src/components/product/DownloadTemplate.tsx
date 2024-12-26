import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function DownloadTemplate() {
  const handleDownload = () => {
    // CSV header and example row
    const headers = [
      'Name',
      'Description',
      'Price',
      'Sale price',
      'Inventory',
      'SKU',
      'Is Featured Product?',
      'Catalog Visibility',
      'Outer Link',
      'Button',
      'Position',
      'Attribute 1 Name',
      'Attribute 1 Value',
      'Attribute 1 Visible',
      'Attribute 1 Global',
      'Attribute 2 Name',
      'Attribute 2 Value',
      'Attribute 2 Visible',
      'Attribute 2 Global',
      'Picture',
      'Tag'
    ].join(',');

    const exampleRow = [
      'Example Product',
      'This is a sample product description',
      '99.99',
      '89.99',
      '100',
      'SKU123',
      'yes',
      'visible',
      'https://example.com',
      'Buy Now',
      '0',
      'Color',
      'Blue',
      'yes',
      'yes',
      'Size',
      'Large',
      'yes',
      'yes',
      'https://example.com/image.jpg',
      'Category1,Category2'
    ].join(',');

    const csvContent = `${headers}\n${exampleRow}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'product_upload_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      onClick={handleDownload}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      下載產品上傳範本
    </Button>
  );
}