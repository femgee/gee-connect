import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import type { Database } from '../lib/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Sidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  isMobileMenuOpen,
  onMobileMenuToggle 
}: SidebarProps) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName] || Icons.BookOpen;
    return Icon;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileMenuToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:z-30
        `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {/* All Topics button */}
          <button
            onClick={() => {
              onCategorySelect(null);
              onMobileMenuToggle();
            }}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
              ${!selectedCategory
                ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                : 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <Icons.Home className="h-5 w-5" />
            <span>All Topics</span>
          </button>

          {/* Categories header */}
          <div className="pt-4 pb-2 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categories
            </h3>
          </div>

          {/* Category buttons */}
          {categories.map((category) => {
            const Icon = getIcon(category.icon);
            return (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  onMobileMenuToggle();
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all
                  ${selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}