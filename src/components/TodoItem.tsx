
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Trash } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete
}) => {
  return (
    <div 
      className="group flex items-center justify-between p-4 border border-border/30 rounded-lg mb-3 bg-white bg-opacity-50 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md animate-slide-in"
    >
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggle(id)}
          className={cn(
            "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300",
            completed 
              ? "bg-primary border-primary text-primary-foreground" 
              : "border-muted-foreground/30 hover:border-primary/70"
          )}
        >
          {completed && <Check className="w-3 h-3" />}
        </button>
        <span 
          className={cn(
            "text-sm transition-all duration-300",
            completed && "line-through text-muted-foreground"
          )}
        >
          {text}
        </span>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-muted-foreground/50 hover:text-destructive p-1 rounded-full"
        aria-label="Delete task"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TodoItem;
