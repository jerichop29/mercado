import { useState } from 'react'

const MODELS = [
  { id: 'B1_1-v1', label: 'Building 1' },
  { id: 'B2_2-v1', label: 'Building 2' },
  { id: 'B4_4-v1', label: 'Building 4' },
  
 
  // Add more models as needed
]

 function ModelSelector({ onModelChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <select 
      onClick={() => setIsExpanded(!isExpanded)}
      onChange={(e) => onModelChange(e.target.value)}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '100px',
        padding: isExpanded ? '8px' : '26px',
        width: isExpanded ? 'auto' : '40px',
        height: isExpanded ? 'auto' : '40px',
        borderRadius: isExpanded ? '4px' : '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        cursor: 'pointer',
        overflow: 'hidden',
        appearance: isExpanded ? 'auto' : 'none'
      }}
    >
      <option value="" disabled>
        Select a model
      </option>
      {MODELS.map(model => (
        <option key={model.id} value={model.id}>
          {model.label}
        </option>
      ))}
    </select>
  )
} 
export {ModelSelector}