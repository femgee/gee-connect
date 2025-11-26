import * as Icons from 'lucide-react';
import type { Database } from '../lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isOpen: boolean;
}

export function Sidebar({ categories, selectedCategory, onCategorySelect, isOpen }: SidebarProps) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.BookOpen;
    return Icon;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => onCategorySelect(null)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <nav className="p-4 space-y-1">
          <button
            onClick={() => onCategorySelect(null)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
              ${!selectedCategory
                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <Icons.Home size={20} />
            <span>All Topics</span>
          </button>

          <div className="pt-4 pb-2 px-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h2>
          </div>

          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
                  ${selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
