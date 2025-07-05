import { COLOR_OPTIONS } from "../../../utils/constant"

const ColorPicker = ({tempColor, setTempColor}) =>{

    return(
       <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-50">
        <div className="grid grid-cols-4 gap-2 mb-3">
            {COLOR_OPTIONS.map((color) => (
            <button
                key={color}
                onClick={() => setTempColor(color)}
                className={`w-6 h-6 rounded border-2 ${
                tempColor === color ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                title={color}
            />
            ))}
        </div>
        <input
            type="color"
            value={''}
            onChange={(e) => setTempColor(e.target.value)}
            className="w-full h-8 rounded border border-gray-300"
        />
        </div>
    )
}

export default ColorPicker