"use client";

import { useQueryCategory } from "@/lib/api/app.query";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";

interface Item {
  id: string;
  content: string;
  isParent?: boolean;
  isChild?: boolean;
}

export const DebugDND = () => {
  const { expense } = useQueryCategory();
  const [items, setItems] = useState<Item[]>([]);

  // Convert categories to hierarchical items
  useEffect(() => {
    if (expense.length === 0) return;

    const categoryItems: Item[] = [];

    // expense.forEach((category) => {
    //   // Add parent category
    //   categoryItems.push({
    //     id: category.id,
    //     content: category.name,
    //     isParent: true,
    //   });

    //   // Add children right after parent
    //   if (category.children) {
    //     category.children.forEach((child) => {
    //       categoryItems.push({
    //         id: child.id,
    //         content: child.name,
    //         isChild: true,
    //       });
    //     });
    //   }
    // });

    setItems(categoryItems);
  }, [expense.length]);

  const handleDragEnd = (result: any) => {
    // Nếu không drop vào vùng hợp lệ
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;

    // Nếu drop vào cùng vị trí
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    console.log("Drag result:", {
      draggableId,
      source: source.droppableId,
      destination: destination.droppableId,
    });

    // Xác định parent mới
    let newParentId = null;
    if (destination.droppableId !== "main") {
      newParentId = destination.droppableId;
    }

    console.log("Will update:", { categoryId: draggableId, newParentId });

    // TODO: Gọi API để update parent
    // updateCategoryParent.mutate({
    //   categoryId: draggableId,
    //   newParentId: newParentId
    // });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Drag & Drop Demo</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          {/* {expense.map((category, categoryIndex) => (
            <div key={category.id} className="border rounded-lg p-4 bg-gray-50">
              {/* Parent category header - không draggable *\/}
              <div className="mb-3">
                <div className="p-3 bg-blue-50 border-blue-200 border rounded-lg font-bold text-blue-700">
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500">Parent</span>
                  </div>
                </div>
              </div>

              {/* Droppable area for children *\/}
              <Droppable droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[100px] p-3 border-2 border-dashed rounded-lg transition-colors ${
                      snapshot.isDraggingOver
                        ? "border-green-500 bg-green-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <p className="text-xs text-gray-500 mb-2">
                      Kéo items vào đây để tạo children của {category.name}
                    </p>

                    {category.children?.map((child, childIndex) => (
                      <Draggable
                        key={child.id}
                        draggableId={child.id}
                        index={childIndex}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 mb-2 bg-green-50 border-green-200 border rounded-lg cursor-move text-green-700 ${
                              snapshot.isDragging
                                ? "shadow-lg"
                                : "hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>→ {child.name}</span>
                              <div className="flex flex-col gap-1">
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))} */}

          {/* Main droppable area for standalone items */}
          <Droppable droppableId="main">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`min-h-[150px] p-4 border-2 border-dashed rounded-lg transition-colors ${
                  snapshot.isDraggingOver
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <p className="text-sm text-gray-600 mb-4">
                  Standalone items (kéo vào parent categories ở trên để tạo
                  children)
                </p>

                {/* {expense
                  .filter((cat) => !cat.children || cat.children.length === 0)
                  .map((category, index) => (
                    <Draggable
                      key={`standalone-${category.id}`}
                      draggableId={category.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-2 bg-white border rounded-lg cursor-move ${
                            snapshot.isDragging
                              ? "shadow-lg"
                              : "hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.name}</span>
                            <div className="flex flex-col gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))} */}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Hiển thị thứ tự hiện tại */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Thứ tự hiện tại:</h3>
        <p className="text-sm text-gray-700">
          {items.map((item) => item.content).join(" → ")}
        </p>
      </div>
    </div>
  );
};
