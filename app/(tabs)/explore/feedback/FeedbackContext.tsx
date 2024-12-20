import React, { createContext, useState, useContext } from "react";

interface Feedback {
  id: string;
  type: "school" | "teacher";
  schoolName: string;
  teacherName?: string;
  content: string;
  rating: number;
  images: string[];
  createdAt: Date;
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  addFeedback: (feedback: Omit<Feedback, "id" | "createdAt">) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

// Dummy data for schools and teachers
export const schools = [
  "School of Business",
  "School of Technology",
  "School of Sciences",
  "School of Arts and Design",
  "School of Architecture and Planning",
  "School of Liberal Arts and Humanities",
  "School of Law",
];
// export const teachers = {
//   "Springfield Elementary": [
//     "Edna Krabappel",
//     "Dewey Largo",
//     "Elizabeth Hoover",
//   ],
//   "Riverdale High": ["Mr. Weatherbee", "Miss Grundy", "Coach Clayton"],
//   "Sunnydale School": ["Rupert Giles", "Jenny Calendar", "Principal Snyder"],
// };
export const teachers = {
  "School of Business": [
    "Ananya Gupta", // Indian
    "Adekunle Olayemi", // Nigerian
    "Jacob Harris", // USA
  ],
  "School of Technology": [
    "Rohan Desai", // Indian
    "Chimamanda Eze", // Nigerian
    "Sophia Walker", // USA
  ],
  "School of Sciences": [
    "Meera Iyer", // Indian
    "Tunde Balogun", // Nigerian
    "William Smith", // USA
  ],
  "School of Arts and Design": [
    "Neha Kapoor", // Indian
    "Ngozi Anyanwu", // Nigerian
    "Jessica Moore", // USA
  ],
  "School of Architecture and Planning": [
    "Arjun Reddy", // Indian
    "Babatunde Adeyemi", // Nigerian
    "James Brown", // USA
  ],
  "School of Liberal Arts and Humanities": [
    "Priyanka Nair", // Indian
    "Chinedu Okoro", // Nigerian
    "Emily Johnson", // USA
  ],
  "School of Law": [
    "Vikram Singh", // Indian
    "Folake Adebayo", // Nigerian
    "Christopher Davis", // USA
  ],
};

// Dummy feedbacks
const dummyFeedbacks: Feedback[] = [
  {
    id: "1",
    type: "school",
    schoolName: "School of Business",
    content: "Great school with dedicated teachers!",
    rating: 4,
    images: ["https://example.com/school1.jpg"],
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "2",
    type: "teacher",
    schoolName: "School of Arts and Design",
    teacherName: "Miss Grundy",
    content: "Miss Grundy is an excellent music teacher.",
    rating: 5,
    images: [],
    createdAt: new Date("2023-06-15"),
  },
];

const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(dummyFeedbacks);

  const addFeedback = (feedback: Omit<Feedback, "id" | "createdAt">) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setFeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider"
    );
  }
  return context;
};

export default FeedbackProvider;
