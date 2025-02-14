import React from 'react'

const ModelSelector = ({ models, currentModel, setCurrentModel }) => {
  // Determine if the screen width is below a certain threshold (e.g., 768px)
  const isMobileView = window.innerWidth < 768;

  return (
    <div style={{
      position: 'absolute',
      bottom: isMobileView? '50vh':'5vh', // Adjust as needed
      right: '2vw',
      zIndex: 12,
      backgroundColor: 'transparent', // Semi-transparent background
      padding: '10px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: isMobileView ? 'column' : 'row', // Change direction based on screen width
      gap: '10px', // Space between buttons
    }}>
      {models.map((model, index) => (
        <button
          key={index}
          onClick={() => setCurrentModel(model.id)}
          style={{
            width: '50px', // Set width for circular button
            height: '50px', // Set height for circular button
            borderRadius: '50%', // Make the button circular
            border:'2px solid white',
            backgroundColor: currentModel === model.id ? 'white' : 'transparent',
            color: currentModel === model.id ? 'black' : 'white',
            cursor: 'pointer',
            display: 'flex', // Center the text
            alignItems: 'center', // Center the text vertically
            justifyContent: 'center', // Center the text horizontally
          }}
        >
          {model.label}
        </button>
      ))}
    </div>
  );
};

export default ModelSelector;