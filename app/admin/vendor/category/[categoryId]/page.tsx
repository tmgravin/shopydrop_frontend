interface PageProps {
  params: { categoryId: string };
}

const CategoryDetails = ({ params }: PageProps) => {
  const { categoryId } = params;
  return <>This is {categoryId}</>;
};

export default CategoryDetails;
