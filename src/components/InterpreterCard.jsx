  import React from 'react';

  const InterpreterCard = ({ name, phone, email, languages }) => {
    return (
      <div className="border border-gray-300 shadow-md p-4 rounded-lg max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-2">
          Phone: <a href={`tel:${phone}`} className="text-blue-500">{phone}</a>
        </p>
        <p className="text-gray-700 mb-2">
          Email: <a href={`mailto:${email}`} className="text-blue-500">{email}</a>
        </p>
        <div className="flex flex-wrap gap-2">
          {languages.map((language, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {language}
            </span>
          ))}
        </div>
      </div>
    );
  };
{
  "component": "import React from 'react';\n\nconst AlertMessage = () => {\n  return (\n    <div className=\"text-red-500 font-bold\">\n      Session expired.\n    </div>\n  );\n};\n\nexport default AlertMessage;"
}

  export default InterpreterCard;


