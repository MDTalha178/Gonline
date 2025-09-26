import { useEffect, useState } from "react"
import { getactivity } from "../../../service/admin/DashBoardService/dashboardService";
import { TimeAgo } from "../../../utils/TimeConversionUtils";
import ActivityItemShimmer from "./ActivityShimmer";
const Activity = () =>{

    const [activity, setActivity] = useState([]);
    const [isLoading, setLoading] = useState(false);
 
    const fetchActivity = async() =>{
        setLoading(true);
        const response = await getactivity();

        if(response?.data){
            setActivity(response?.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchActivity();
    }, [setActivity]);

    if(isLoading) return <ActivityItemShimmer  message='Loading..' />

    return(
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-light text-gray-900 mb-6 uppercase tracking-wider">Recent Activity</h3>
            <div className="space-y-4">
            {activity && activity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300">
                <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-yellow-500' : 
                    'bg-blue-500'
                }`} />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 font-light">{activity?.description}</p>
                </div>
                <span className="text-xs text-gray-400 font-light">
                    <TimeAgo createdAt={activity?.created_at}/>
                </span>
                </div>
            ))}
            </div>
    </div>
    )
}

export default Activity