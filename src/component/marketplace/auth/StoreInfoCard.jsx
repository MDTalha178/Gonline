import { Shield, Star, Store, Truck } from "lucide-react";

export const StorInfoCard = ({storeData}) => {
    return (
        <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
              <StoreInfo storeData={storeData} />
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Secure</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <p className="text-white/80 text-sm">Premium</p>
                </div>
              </div>
            </div>
        </div>
    );
}

export const StoreInfo = ({ storeData }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          <Store className="w-8 h-8 text-gray-800" />
        </div>
        <div>
          <h2 className="text-xl font-light text-white">{storeData?.name}</h2>
          <p className="text-white/80 text-sm">{storeData?.category}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white/90 text-sm">{storeData?.rating} Rating</span>
        </div>
        <div className="flex items-center space-x-2">
          <Truck className="w-4 h-4 text-white/80" />
          <span className="text-white/90 text-sm">Free Delivery</span>
        </div>
      </div>
      
      <p className="text-white/70 text-sm font-light leading-relaxed">
        {storeData?.description}
      </p>
    </div>
  );
};
