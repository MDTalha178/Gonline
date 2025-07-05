import { Edit3, Sparkles } from "lucide-react"

const EditableCompoenent = ({value, buttonClassName, setEdit}) =>{
    return (
    <div>
      <button className={buttonClassName}>
        {value}
      </button>
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setShowAIPopup(true)}
          className="bg-purple-500 text-white p-1 rounded hover:bg-purple-600 transition-colors"
          title="Generate with AI"
        >
          <Sparkles className="w-3 h-3" />
        </button>
        <button
          onClick={() => setEdit(true)}
          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition-colors"
          title="Edit manually"
        >
          <Edit3 className="w-3 h-3" />
        </button>
      </div>
    </div>
    )
}

export default EditableCompoenent