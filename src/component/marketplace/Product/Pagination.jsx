const Pagination = ({ currentPage, totalPages, onPageChange }) => {
return (
    <div className="flex items-center justify-center mt-12">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-none hover:bg-gray-100 transition-colors">
            Previous
          </button>
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded-none transition-all ${
                page === 2 
                  ? 'bg-gray-900 text-white' 
                  : 'border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 border border-gray-300 rounded-none hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
    </div>
  );
};

export default Pagination;