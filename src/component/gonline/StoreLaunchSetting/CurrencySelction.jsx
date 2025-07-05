import { DollarSign, DollarSignIcon } from "lucide-react";
import currencies from "../../../data/storeCurrencies";

const CurrencySelction = ({settings, handleSettingChange}) =>{
    return(
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSignIcon className="w-5 h-5 mr-2 text-purple-600" />
                Store Currency
            </h3>
            <select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                    </option>
                ))}
            </select>
        </div>
    )
}

export  default CurrencySelction;