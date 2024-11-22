/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

interface FormGeneratorProps {
  schema: FormSchema | null;
  darkMode: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema, darkMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const [submittedData, setSubmittedData] = useState<any>(null);

  if (!schema) {
    return (
      <p className={`text-gray-500 ${darkMode ? "text-gray-300" : ""}`}>
        No form to display. Enter a valid JSON schema.
      </p>
    );
  }

  if (!schema.fields || !Array.isArray(schema.fields)) {
    return (
      <p className={`text-gray-500 ${darkMode ? "text-gray-300" : ""}`}>
        The schema has no valid fields to display.
      </p>
    );
  }


  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
    setSubmittedData(data);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(submittedData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "form-submission.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"} sm:w-full md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto`}
    >
      <h1 className="text-2xl font-bold">{schema.formTitle}</h1>
      <p className="text-gray-600">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {schema.fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
              <select
                id={field.id}
                className={`mt-1 block w-full rounded border-gray-300 ${darkMode ? "bg-gray-700 text-white" : ""}`}
                {...register(field.id, { required: field.required })}
              >
                <option value="">Select...</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`mt-1 block w-full rounded border-gray-300 ${darkMode ? "bg-gray-700 text-white" : ""}`}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message,
                      }
                    : undefined,
                })}
              />
            )}
            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">
                {(errors[field.id] as any).message || "This field is required"}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${darkMode ? "bg-blue-700" : ""}`}
        >
          Submit
        </button>
      </form>
      {submittedData && (
        <button
          onClick={handleDownload}
          className={`mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 ${darkMode ? "bg-green-700" : ""}`}
        >
          Download Submission
        </button>
      )}
    </div>
  );
};

export default FormGenerator;
