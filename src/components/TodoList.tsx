
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TodoItem from './TodoItem';
import { useToast } from '@/hooks/use-toast';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false
    };

    setTodos([...todos, todo]);
    setNewTodo('');
    toast({
      title: 'Task added',
      description: 'Your new task has been added to the list.',
      duration: 3000,
    });
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      title: 'Task deleted',
      description: 'Your task has been removed from the list.',
      duration: 3000,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex items-center gap-2 p-1 border border-border/50 rounded-lg overflow-hidden bg-white bg-opacity-50 backdrop-blur-sm shadow-sm focus-within:ring-1 focus-within:ring-primary/20 focus-within:border-primary/30 transition-all duration-300">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-2 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-md p-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            disabled={!newTodo.trim()}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="space-y-1">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground animate-fade-in">
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs mt-1">Add a task to get started</p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
