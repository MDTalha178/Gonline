import { Calendar } from "lucide-react"

const DateRangeFilter = ({dateRange, setDateRange}) =>{
    return(
        <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-none text-sm font-light focus:ring-0 focus:border-gray-900"
            />
            <span className="text-gray-400">to</span>
            <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-none text-sm font-light focus:ring-0 focus:border-gray-900"
            />
        </div>
    )
}

export default DateRangeFilter