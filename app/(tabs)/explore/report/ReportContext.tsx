// import React, { createContext, useState, useContext } from "react";

// interface Report {
//   id: string;
//   title?: string;
//   description: string;
//   category: string;
//   location: string;
//   image: string;
//   status: "open" | "assigned" | "resolved";
//   assignedTo?: string;
// }

// interface ReportContextType {
//   reports: Report[];
//   addReport: (report: Omit<Report, "id" | "status">) => void;
//   assignIssue: (id: string, assignedTo: string) => void;
//   resolveIssue: (id: string) => void;
// }

// const ReportContext = createContext<ReportContextType | undefined>(undefined);

// // Dummy reports data
// const dummyReports: Report[] = [
//   {
//     id: "1",
//     description: "Pothole on Main Street",
//     category: "Infrastructure",
//     location: "Main Street, near City Hall",
//     image: "https://example.com/pothole.jpg",
//     status: "open",
//   },
//   {
//     id: "2",
//     description: "Broken streetlight",
//     category: "Maintenance",
//     location: "Corner of Elm and Oak",
//     image: "https://example.com/streetlight.jpg",
//     status: "assigned",
//     assignedTo: "John Doe",
//   },
//   {
//     id: "3",
//     description: "Graffiti on public building",
//     category: "Vandalism",
//     location: "Community Center",
//     image: "https://example.com/graffiti.jpg",
//     status: "resolved",
//   },
//   {
//     id: "4",
//     description: "Overflowing trash bin",
//     category: "Sanitation",
//     location: "Central Park",
//     image: "https://example.com/trash.jpg",
//     status: "open",
//   },
//   {
//     id: "5",
//     description: "Fallen tree blocking sidewalk",
//     category: "Environment",
//     location: "Maple Avenue",
//     image: "https://example.com/fallen-tree.jpg",
//     status: "assigned",
//     assignedTo: "Jane Smith",
//   },
// ];

// const ReportProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [reports, setReports] = useState<Report[]>(dummyReports);

//   const addReport = (report: Omit<Report, "id" | "status">) => {
//     const newReport: Report = {
//       ...report,
//       id: Date.now().toString(),
//       status: "open",
//     };
//     setReports([...reports, newReport]);
//   };

//   const assignIssue = (id: string, assignedTo: string) => {
//     setReports(
//       reports.map((report) =>
//         report.id === id
//           ? { ...report, status: "assigned", assignedTo }
//           : report
//       )
//     );
//   };

//   const resolveIssue = (id: string) => {
//     setReports(
//       reports.map((report) =>
//         report.id === id ? { ...report, status: "resolved" } : report
//       )
//     );
//   };

//   return (
//     <ReportContext.Provider
//       value={{ reports, addReport, assignIssue, resolveIssue }}
//     >
//       {children}
//     </ReportContext.Provider>
//   );
// };

// export const useReportContext = () => {
//   const context = useContext(ReportContext);
//   if (context === undefined) {
//     throw new Error("useReportContext must be used within a ReportProvider");
//   }
//   return context;
// };

// export default ReportProvider;

import React, { createContext, useState, useContext } from "react";

interface Report {
  id: string;
  title?: string;
  description: string;
  category: string;
  location: string;
  image: string;
  status: "open" | "assigned" | "resolved";
  assignedTo?: string;
}

interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "status">) => void;
  assignIssue: (id: string, assignedTo: string) => void;
  resolveIssue: (id: string) => void;
  assignees: string[]; // Added for dynamic assignee selection
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

// Dummy assignees and reports data
const dummyAssignees: string[] = ["John Doe", "Jane Smith", "Mark Wilson"];
const dummyReports: Report[] = [
  {
    id: "1",
    title: "Fix Pothole on Main Street",
    description: "A large pothole near City Hall is causing traffic issues.",
    category: "Infrastructure",
    location: "Main Street, near City Hall",
    image: "https://example.com/pothole.jpg",
    status: "open",
  },
  {
    id: "2",
    title: "Repair Broken Streetlight",
    description: "Streetlight is broken at the corner of Elm and Oak.",
    category: "Maintenance",
    location: "Corner of Elm and Oak",
    image: "https://example.com/streetlight.jpg",
    status: "assigned",
    assignedTo: "John Doe",
  },
  {
    id: "3",
    title: "Remove Graffiti on Public Building",
    description: "Graffiti on the wall of the Community Center.",
    category: "Vandalism",
    location: "Community Center",
    image: "https://example.com/graffiti.jpg",
    status: "resolved",
  },
  {
    id: "4",
    title: "Clean Overflowing Trash Bin",
    description:
      "Trash bin in Central Park is overflowing and needs attention.",
    category: "Sanitation",
    location: "Central Park",
    image: "https://example.com/trash.jpg",
    status: "open",
  },
  {
    id: "5",
    title: "Remove Fallen Tree Blocking Sidewalk",
    description: "A tree has fallen on Maple Avenue, blocking the sidewalk.",
    category: "Environment",
    location: "Maple Avenue",
    image: "https://example.com/fallen-tree.jpg",
    status: "assigned",
    assignedTo: "Jane Smith",
  },
];

const ReportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reports, setReports] = useState<Report[]>(dummyReports);

  // Add new report
  const addReport = (report: Omit<Report, "id" | "status">) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      status: "open",
    };
    setReports([...reports, newReport]);
  };

  // Assign an issue
  const assignIssue = (id: string, assignedTo: string) => {
    setReports(
      reports.map((report) =>
        report.id === id
          ? { ...report, status: "assigned", assignedTo }
          : report
      )
    );
  };

  // Resolve an issue
  const resolveIssue = (id: string) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "resolved" } : report
      )
    );
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        addReport,
        assignIssue,
        resolveIssue,
        assignees: dummyAssignees,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
};

export default ReportProvider;
