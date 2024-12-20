import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onDragEnd: (result: any) => Promise<void>;
}

export function ProductList({ products, loading, onDelete, onDragEnd }: ProductListProps) {
  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">產品列表</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {products.map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={product.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div {...provided.dragHandleProps}>
                        <GripVertical className="h-5 w-5 text-gray-400" />
                      </div>
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}