import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = (props) => {
  const navigate = useNavigate();
  const { marks, fullmarks, question } = props.props;
  const resultStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const itemStyles = {
    background: 'lightgray', // Default background color
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  };

  // Define an array of trendy and popular colors
  const bgColors = [
    '#FF7F50', // Coral
    '#8A2BE2', // Blue Violet
    '#FFD700', // Gold
    '#1E90FF', // Dodger Blue
    '#FF69B4', // Hot Pink
  ];

  const generateRandomColor = () => {
    // Generate a random index to select a color from the array
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  const items = [
    { text: 'Your Marks:', value: marks },
    { text: 'Full Marks:', value: fullmarks },
    { text: 'Test Topic:', value: question },
  ];

  return (
    <div className="bg-gradient-to-t from-blue-500 to-blue-700 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-gray-800 w-4/5 md:w-3/5 lg:w-2/5" style={resultStyles}>
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8 underline">Test Results</h1>
        {items.map((item, index) => (
          <div key={index} style={{ ...itemStyles, background: generateRandomColor() }}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{item.text}</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{item.value}</span>
          </div>
        ))}
        <button
          onClick={() => navigate('/test')}
          className="bg-indigo-800 text-white py-3 w-full rounded-full text-xl font-semibold transition duration-300 transform hover:scale-105 hover:bg-indigo-900"
        >
          Back to Test
        </button>
      </div>
    </div>
  );
}

export default Result;
