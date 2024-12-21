import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SeoFieldsProps {
  seoTitle: string;
  seoKeywords: string;
  seoDescription: string;
  onSeoChange: (field: string, value: string) => void;
}

export function SeoFields({ seoTitle, seoKeywords, seoDescription, onSeoChange }: SeoFieldsProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="SEO 標題"
        value={seoTitle}
        onChange={e => onSeoChange('seo_title', e.target.value)}
      />
      <Input
        placeholder="SEO 關鍵字"
        value={seoKeywords}
        onChange={e => onSeoChange('seo_keywords', e.target.value)}
      />
      <Textarea
        placeholder="SEO 描述"
        value={seoDescription}
        onChange={e => onSeoChange('seo_description', e.target.value)}
      />
    </div>
  );
}