import React from "react";
function Category({categories,selectedCategory,setSelectedCategory}){
  return(
    <div className="category-container">
      {categories.map((category,index)=>(
        <button key={index} className={`category-button ${selectedCategory===category?'active':''}`}
        onClick={()=>setSelectedCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  
  );
}

export default Category;