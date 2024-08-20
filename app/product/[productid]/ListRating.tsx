"use client";

import Heading from "@/components/products/Heading";
import { Rating } from '@mui/material';
import { FaRegThumbsUp } from "react-icons/fa";
import { RiThumbDownLine } from "react-icons/ri";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  const averageRating = product?.averageRating || 0;
  const totalRatings = product?.totalRatings || 0;
  const reviews = product?.reviews || [];
  const ratingBreakdown = product?.ratingBreakdown || [];

  return (
    <div className="p-4  ml-[50%] mt-[-250px] border rounded shadow-sm">
      <Heading center title="Ratings & Reviews" />
      <div className="my-4">
        <div className="flex items-center">
          <Rating value={averageRating} readOnly />
          <span className="ml-2 text-xl font-bold">{averageRating} ★</span>
        </div>
        <div className="text-gray-600">{totalRatings} Ratings & {reviews.length} Reviews</div>
      </div>
      <div className="mb-4">
        {ratingBreakdown.map((rating: any, index: number) => (
          <div key={index} className="flex items-center">
            <div className="w-1/12 text-right">{rating.star} ★</div>
            <div className="w-10/12 mx-2 bg-gray-300 rounded h-2 relative">
              <div className={`absolute top-0 left-0 h-2 ${rating.percentage > 75 ? 'bg-green-500' : rating.percentage > 50 ? 'bg-green-400' : rating.percentage > 25 ? 'bg-yellow-500' : rating.percentage > 10 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${rating.percentage}%` }}></div>
            </div>
            <div className="w-1/12 text-right">{rating.count}</div>
          </div>
        ))}
      </div>
      <div>
        {reviews.map((review: any, index: number) => (
          <div key={review.id} className="p-4 border-b">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">A</div>
              <div className="flex-1">
                <div className="font-bold">{review.user.name}</div>
                <Rating value={review.rating} readOnly size="small" />
              </div>
            </div>
            <div className="text-gray-700">{review.comment}</div>
            <div className="flex gap-3 text-center justify-end    mt-2">
            <FaRegThumbsUp size={16} />
            <RiThumbDownLine size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListRating;
