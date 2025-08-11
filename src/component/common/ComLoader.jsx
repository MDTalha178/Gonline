import ComponentLoader from "./ComponentLoader"

const CardLoader = ({ isLoading, message = "Loading data" }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent p-8 flex justify-center">
      <div className="space-y-4 max-w-sm w-full">
        <ComponentLoader
          isLoading={isLoading}
          spinner={true}
          message={message}
          variant="card"
          size="md"
          className="w-full"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
                Loading Data...
            </h4>
            <p className="text-gray-600">
                Please wait while we fetch the data.
            </p>
            <div className="mt-4 h-20 bg-gray-100 rounded-lg"></div>
          </div>
        </ComponentLoader>
      </div>
    </div>
  );
};

export default CardLoader;
