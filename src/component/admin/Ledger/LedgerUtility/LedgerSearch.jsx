import { Search } from "lucide-react";

const LedgerSearch = ({searchTerm, setSearchTerm}) =>{
    return(
        <div className="flex-1 min-w-[200px]">
            <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
            />
            </div>
        </div>
    )
}

export default LedgerSearch;