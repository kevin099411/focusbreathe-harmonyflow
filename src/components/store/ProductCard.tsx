import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const { data, error } = await supabase.functions.invoke('upload-product-image', {
        body: formData,
      });

      if (error) throw error;
      
      setImageUrl(data.publicUrl);
      toast({
        title: "上傳成功",
        description: "圖片已成功上傳",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "上傳失敗",
        description: "圖片上傳失敗，請重試",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      <div 
        {...getRootProps()}
        className={`relative h-64 overflow-hidden bg-gray-100 cursor-pointer
          ${isDragActive ? 'border-2 border-dashed border-primary' : ''}`}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload className="h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600 mt-2">
              {isDragActive ? '放開以上傳圖片' : '拖放圖片至此處，或點擊上傳'}
            </p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {product.title}
        </h2>
        <div 
          className="text-gray-600 text-sm mb-4 line-clamp-3 h-[4.5rem]"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary">
            NT${parseFloat(product.price).toLocaleString()}
          </span>
          <Button 
            variant="secondary"
            className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>加入購物車</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};