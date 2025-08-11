import ComponentLoader from "./ComponentLoader";

const CardLoader = ({ isLoading, message = "Loading data" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 p-8">
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="space-y-4 max-w-sm w-full">
          <ComponentLoader
            isLoading={isLoading}
            spinner={true}
            message={message}
            variant="card"
            size="md"
            className="w-full"
        >
          </ComponentLoader>
        </div>
      </div>
    </div>
  );
};

export default CardLoader;