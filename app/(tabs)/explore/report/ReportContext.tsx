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
    title: "Fix Broken Classroom Door",
    description: "The door of Room 101 is broken and does not close properly.",
    category: "Maintenance",
    location: "Classroom 101, Main Building",
    image: "https://example.com/broken-door.jpg",
    status: "open",
  },
  {
    id: "2",
    title: "Repair Playground Equipment",
    description: "One of the swings in the playground is broken and unsafe.",
    category: "Safety",
    location: "School Playground",
    image: "https://example.com/broken-swing.jpg",
    status: "assigned",
    assignedTo: "Maintenance Team",
  },
  {
    id: "3",
    title: "Paint Faded Wall in Corridor",
    description:
      "The wall in the corridor near the cafeteria needs repainting.",
    category: "Aesthetics",
    location: "Cafeteria Corridor, Second Floor",
    image: "https://example.com/faded-wall.jpg",
    status: "resolved",
  },
  {
    id: "4",
    title: "Clean Overflowing Trash Bins",
    description:
      "The trash bins in the lunch area are overflowing and need attention.",
    category: "Sanitation",
    location: "Lunch Area, Ground Floor",
    image: "https://example.com/trash-bin.jpg",
    status: "open",
  },
  {
    id: "5",
    title: "Fix Air Conditioner in Computer Lab",
    description: "The air conditioner in the computer lab is not working.",
    category: "Facilities",
    location: "Computer Lab, Room 203",
    image: "https://example.com/air-conditioner.jpg",
    status: "assigned",
    assignedTo: "Facility Manager",
  },
  {
    id: "6",
    title: "Repair Broken Desk",
    description: "A student desk in Room 305 is broken and unstable.",
    category: "Maintenance",
    location: "Classroom 305, Third Floor",
    image: "https://example.com/broken-desk.jpg",
    status: "open",
  },
  {
    id: "7",
    title: "Remove Graffiti on School Wall",
    description: "Graffiti on the back wall of the school building.",
    category: "Vandalism",
    location: "Back Wall, Near Parking Lot",
    image: "https://example.com/school-graffiti.jpg",
    status: "resolved",
  },
  {
    id: "8",
    title: "Replace Burnt-Out Light Bulbs",
    description: "Several light bulbs in the library are not working.",
    category: "Electrical",
    location: "School Library, First Floor",
    image: "https://example.com/burnt-bulbs.jpg",
    status: "open",
  },
  {
    id: "9",
    title: "Fix Leaking Faucet in Restroom",
    description:
      "The faucet in the boys' restroom on the second floor is leaking.",
    category: "Plumbing",
    location: "Boys' Restroom, Second Floor",
    image: "https://example.com/leaking-faucet.jpg",
    status: "assigned",
    assignedTo: "Plumber",
  },
  {
    id: "10",
    title: "Fix Cracked Window in Science Lab",
    description:
      "A window in the science lab is cracked and poses a safety risk.",
    category: "Safety",
    location: "Science Lab, Room 210",
    image: "https://example.com/cracked-window.jpg",
    status: "open",
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
