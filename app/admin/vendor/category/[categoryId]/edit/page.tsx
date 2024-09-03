import React from "react";

interface PageProps {
  params: {
    categoryId: string;
  };
}

const EditCategory = ({ params }: PageProps) => {
  const { categoryId } = params;

  return <div>EditCategory {categoryId}</div>;
};

export default EditCategory;
