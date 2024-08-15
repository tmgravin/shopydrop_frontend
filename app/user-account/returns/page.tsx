"use client";
import AccountLayout from '../accountLayout';

const ProductReturn = () => {
  // Static return data
  const returns = [ 
    {
      id: '11223',
      status: 'Approved',
      items: [
        {
          name: 'External Hard Drive',
          reason: 'Changed mind',
          imageUrl: 'https://www.merokirana.com/archive/KiranaProduct/98ae872e3cc24707895cb88123c3ead9.jpeg', // Replace with a Google image URL
        },
      ],
    },
    {
      id: '67890',
      status: 'Rejected',
      items: [
        {
          name: 'Monitor',
          reason: 'No longer needed',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe0x4nRHmYEJtr7boLfWdjhSKDpbhp4k6VQA&s', // Replace with a Google image URL
        },
      ],
    },
    {
      id: '13579',
      status: 'Completed',
      items: [
        {
          name: 'Headphones',
          reason: 'Damaged packaging',
          imageUrl: 'https://www.merokirana.com/archive/KiranaProduct/81bsNnbi2gL._SL1500_bd844e2f-54c8-4ac4-8ca1-338289ceb639.jpg', // Replace with a Google image URL
        },
      ],
    },
  ];

  return (
    <AccountLayout>
      <div className="mx-12 w-[1000px]">
        <h1 className="text-2xl font-semibold mb-4">Product Returns</h1>
        <div className="space-y-4 w-full">
          {returns.length > 0 ? (
            returns.map((ret) => (
              <div key={ret.id} className="p-4 border rounded-md shadow-sm">
                <h2 className="text-lg font-medium">Return ID: {ret.id}</h2>
                <p className="text-gray-600">Status: {ret.status}</p>
                <ul className="mt-2 space-y-2">
                  {ret.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="mr-2 w-16 h-16 rounded"
                      />
                      <span>{item.name}</span>
                      <span>{item.reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No returns available.</p>
          )}
        </div>
      </div>
    </AccountLayout>
  );
}

export default ProductReturn;
