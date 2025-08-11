import { useEffect, useState } from "react";
import ProductComponent from "../../../component/marketplace/Product/ProductComponent"
import { useToast } from "../../../hooks/useToast";
import { fetchProductList } from "../../../service/marketPlace/product_service";

const StoreProduct = () =>{
    const {toast} = useToast();
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search and  functionality can be added here
    const [searchQuery, setSearchQuery] = useState("");

    // filter functionality can be added here
    const[filter, setFilter] = useState({
        category: [],
        priceRange: [0, 10000],
        rating: 0,
    });


    useEffect(() => {
    /**
     * Fetches products from API given the current searchQuery and filter settings
     * 
     * @function
     * @async
     * @returns {void}
     */
        const fetchProducts = async () => {
            try {
                const response = await fetchProductList(toast, {search: searchQuery, category: filter.category, min_price: filter.priceRange[0], max_price: filter.priceRange[1], rating: filter.rating}); 
                if(response?.data) setProductData(response.data,);
            } catch (error) {
                toast.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();

    }, [setProductData, searchQuery, filter, setFilter]);


    return(
        <ProductComponent productData={productData} setSearchQuery={setSearchQuery} searchQuery={searchQuery} filter={filter} setFilter={setFilter} loading={loading}/>
    )
}

export default StoreProduct;