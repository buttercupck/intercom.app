{
  "component": "import React from 'react';\n\nconst CourtCard = ({ courtName, address, numJobs }) => {\n  return (\n    <div className=\"court-card\">\n      <h2>{courtName}</h2>\n      <p>{address}</p>\n      <p>Number of Jobs: {numJobs}</p>\n    </div>\n  );\n};\n\nexport default CourtCard;"
}