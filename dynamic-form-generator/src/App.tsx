import { useState } from "react";
import JSONEditor from "./Components/JSONEditor";
import FormGenerator from "./Components/FormGenerator";
import "./App.css"


const initialSchema = JSON.stringify(
  {
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        required: true,
        options: [
          { value: "1-50", label: "1-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "201-1000", label: "201-1000 employees" },
          { value: "1000+", label: "1000+ employees" },
        ],
      },
    ],
  },
  null,
  2
);

const App = () => {
  const [schema, setSchema] = useState<string>(initialSchema);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSchemaChange = (json: string) => {
    setSchema(json);
    try {
      JSON.parse(json);
      setError(null);
    } catch (e) {
      setError("Invalid JSON format");
      console.log(e);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
    <div className="flex flex-col lg:flex-row h-screen dark:bg-gray-800 dark:text-white">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <label className="text-gray-500 dark:text-gray-300 "></label>
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`w-12 h-6 rounded-full p-1 cursor-pointer flex items-center transition-colors ${
            darkMode ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full transition-transform ${
              darkMode ? "transform translate-x-6" : ""
            }`}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-4">
        <JSONEditor onChange={handleSchemaChange} error={error} darkMode={darkMode} />
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <FormGenerator schema={error ? null : JSON.parse(schema)} darkMode={darkMode} />
      </div>
    </div>
  </div>
  );
};

export default App;
