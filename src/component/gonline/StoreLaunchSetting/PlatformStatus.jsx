import { Eye, EyeOff } from "lucide-react";
import { STORE_STATUS } from "../../../utils/constant";

const PlatformStatus = ({settings, handleSettingChange}) =>{
    return(
         <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-600" />
                Platform Status
            </h3>
            <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="radio"
                        name="platformStatus"
                        value={STORE_STATUS.PUBLISHED}
                        checked={settings.platformStatus == STORE_STATUS.PUBLISHED}
                        onChange={(e) => handleSettingChange('platformStatus', e.target.value)}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">Published</span>
                        <span className="text-sm text-gray-500">(Visible to everyone)</span>
                    </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="radio"
                        name="platformStatus"
                       value={STORE_STATUS.DRAFT}
                        checked={settings.platformStatus == STORE_STATUS.DRAFT}
                        onChange={(e) => handleSettingChange('platformStatus', e.target.value)}
                        className="text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex items-center space-x-2">
                        <EyeOff className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-gray-900">Draft</span>
                        <span className="text-sm text-gray-500">(Only visible to you)</span>
                    </div>
                </label>
            </div>
        </div>
    )
}

export default PlatformStatus;