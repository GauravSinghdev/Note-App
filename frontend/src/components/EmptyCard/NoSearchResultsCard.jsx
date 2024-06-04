import React from 'react';

const NoSearchResultsCard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-[200px]">
      <h2 className="text-[60px] font-semibold">No Results Found</h2>
      <p className="mt-2 text-gray-600 text-[40px]">Try different keywords or add a new note.</p>
    </div>
  );
};

export default NoSearchResultsCard;
