import React, { useState } from 'react';

interface JSONEditorProps {
  onChange: (json: string) => void;
  error: string | null;
  darkMode: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange, error ,darkMode}) => {
  const [value, setValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    alert("JSON copied to clipboard!");
  };

  return (
    <div className="h-full flex flex-col">
    <textarea
      className={`w-full h-full p-4 rounded border ${
        darkMode ? "bg-gray-900 text-white border-gray-600" : "bg-white text-black border-gray-300"
      }`}
      value={value}
      onChange={handleInputChange}
      placeholder="Enter JSON schema..."
    />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    <button
      onClick={handleCopy}
      className={`mt-4 py-2 px-4 rounded ${
        darkMode ? "bg-blue-500 text-white" : "bg-blue-700 text-white"
      }`}
    >
      Copy Form JSON
    </button>
  </div>
  );
};

export default JSONEditor;
