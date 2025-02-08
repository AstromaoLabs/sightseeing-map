import React from "react";

function Category({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex justify-between gap-2">
      {categories.map((category) => (
        <button
          key={category.name}
          value={category.name}
          className={`${
            selectedCategory === category.name
              ? 'text-md font-ptsans font-bold flex justify-between px-3 py-2 rounded-full bg-primary text-white gap-2'
              : 'text-md font-ptsans font-bold flex justify-between px-3 py-2 rounded-full bg-secondary text-white gap-2 shadow-sm shadow-slate-700'
          }`}
          onClick={() => setSelectedCategory(category.name)}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
}

export default Category;