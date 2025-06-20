'use client';

import { useEffect, useState } from 'react';
import { getAllCategories } from '../../api/categoryData';
import CategoryCard from '../../components/CategoryCard';
import CategoryForm from '../../components/CategoryForm';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    setLoading(true);
    getAllCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm onUpdate={fetchCategories} />
      <div className="categories-grid">
        {categories
          .filter((category) => category)
          .map((category) => (
            <CategoryCard key={category.id} cat={category} onUpdate={fetchCategories} />
          ))}
      </div>
    </div>
  );
}
