Form Generator App
This is a form generator application that allows users to input a JSON schema to dynamically generate forms. It supports dark mode and provides functionality for downloading form submissions as JSON files.

Prerequisites
Ensure you have the following tools installed:

Node.js (v14 or higher)
npm (or yarn)
Steps to Setup
Clone the Repository

First, clone the repository to your local machine:

git clone https://github.com/yourusername/form-generator-app.git
cd form-generator-app
Install Dependencies

Dependencies
Here are the main dependencies used in this project:

React: The library used for building the user interface.
Tailwind CSS: A utility-first CSS framework used for styling.
React Hook Form: For handling form state, validation, and submission.
TypeScript: Ensures type safety throughout the application.
jsoneditor: A JavaScript library to provide an interactive JSON editor in the app.

Run the following command to install all required dependencies:
npm install
Run the Development Server

To start the application, run the following command:
npm run dev
This will start the development server, and you can access the app in your browser at http://localhost:5173 (or any port specified).


Initially below json code will be shown:
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    }
  ]
}

if you have to change it use diffrent one or take example from below:
{
  "formTitle": "User Registration",
  "formDescription": "Please fill out the registration form to create an account",
  "fields": [
    {
      "id": "username",
      "type": "text",
      "label": "Username",
      "required": true,
      "placeholder": "Enter your username"
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password",
      "required": true,
      "placeholder": "Enter your password"
    },
    {
      "id": "confirmPassword",
      "type": "password",
      "label": "Confirm Password",
      "required": true,
      "placeholder": "Confirm your password"
    }
  ]
}


Dark Mode
To toggle dark mode, click the switch at the top-right corner of the app. The form and editor will switch to dark mode or light mode based on your selection.

Handling Form Submission
When a user submits the form:

The form data will be displayed in the form of an alert.
The user will also have the option to download the form data as a .json file by clicking the "Download Submission" button.



