import React, { createContext, useContext, useState, ReactNode } from "react";

export type School = {
  id: string;
  name: string;
};

export type SpendingItem = {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
};

export type Budget = {
  id: string;
  schoolId: string;
  totalAmount: number;
  allocatedAmount: number;
  remainingAmount: number;
  description: string;
  category: string;
  createdAt: Date;
  spendings: SpendingItem[];
};

type BudgetContextType = {
  schools: School[];
  budgets: Budget[];
  allocateBudget: (
    schoolId: string,
    amount: number,
    description: string
  ) => void;
  addSpending: (budgetId: string, spending: Omit<SpendingItem, "id">) => void;
};

// Updated dummy data
const dummySchools: School[] = [
  { id: "1", name: "Springfield Elementary" },
  { id: "2", name: "Riverside High School" },
  { id: "3", name: "Central Academy" },
];

const dummyBudgets: Budget[] = [
  {
    id: "1",
    schoolId: "1",
    totalAmount: 500000,
    allocatedAmount: 350000,
    remainingAmount: 150000,
    description: "Annual Budget 2024",
    category: "General",
    createdAt: new Date("2024-01-01"),
    spendings: [
      {
        id: "1",
        name: "Teacher Salaries",
        amount: 200000,
        date: new Date("2024-01-15"),
        category: "Staff",
        description: "Monthly salaries for teaching staff",
      },
      {
        id: "2",
        name: "New Science Lab Equipment",
        amount: 50000,
        date: new Date("2024-02-01"),
        category: "Facilities",
        description:
          "Upgrade of science lab with new microscopes and lab stations",
      },
      {
        id: "3",
        name: "School Bus Maintenance",
        amount: 15000,
        date: new Date("2024-02-15"),
        category: "Transportation",
        description: "Regular maintenance and repairs for school buses",
      },
      {
        id: "4",
        name: "Library Books",
        amount: 25000,
        date: new Date("2024-03-01"),
        category: "Educational Materials",
        description:
          "New books and digital subscriptions for the school library",
      },
      {
        id: "5",
        name: "Sports Equipment",
        amount: 20000,
        date: new Date("2024-03-15"),
        category: "Physical Education",
        description:
          "Replacement of worn-out sports equipment and new gear for various teams",
      },
      {
        id: "6",
        name: "IT Infrastructure",
        amount: 40000,
        date: new Date("2024-04-01"),
        category: "Technology",
        description: "Upgrade of school's computer network and Wi-Fi system",
      },
    ],
  },
  {
    id: "2",
    schoolId: "1",
    totalAmount: 100000,
    allocatedAmount: 75000,
    remainingAmount: 25000,
    description: "Special Programs Budget 2024",
    category: "Special Programs",
    createdAt: new Date("2024-01-01"),
    spendings: [
      {
        id: "7",
        name: "After-School Tutoring Program",
        amount: 30000,
        date: new Date("2024-01-20"),
        category: "Academic Support",
        description:
          "Funding for tutors and materials for after-school academic support",
      },
      {
        id: "8",
        name: "Arts and Music Program",
        amount: 25000,
        date: new Date("2024-02-05"),
        category: "Arts Education",
        description:
          "Supplies and instructor fees for expanded arts and music classes",
      },
      {
        id: "9",
        name: "STEM Workshop Series",
        amount: 20000,
        date: new Date("2024-03-10"),
        category: "STEM Education",
        description: "Materials and guest speaker fees for STEM workshops",
      },
    ],
  },
  {
    id: "3",
    schoolId: "2",
    totalAmount: 750000,
    allocatedAmount: 500000,
    remainingAmount: 250000,
    description: "Annual Budget 2024",
    category: "General",
    createdAt: new Date("2024-01-01"),
    spendings: [
      {
        id: "10",
        name: "Staff Salaries",
        amount: 300000,
        date: new Date("2024-01-15"),
        category: "Staff",
        description: "Monthly salaries for teaching and administrative staff",
      },
      {
        id: "11",
        name: "Cafeteria Renovation",
        amount: 100000,
        date: new Date("2024-02-01"),
        category: "Facilities",
        description: "Complete renovation of school cafeteria",
      },
      {
        id: "12",
        name: "Textbook Update",
        amount: 50000,
        date: new Date("2024-02-15"),
        category: "Educational Materials",
        description: "Purchase of updated textbooks for core subjects",
      },
      {
        id: "13",
        name: "Athletic Field Maintenance",
        amount: 30000,
        date: new Date("2024-03-01"),
        category: "Physical Education",
        description: "Annual maintenance of football field and track",
      },
      {
        id: "14",
        name: "Computer Lab Upgrade",
        amount: 20000,
        date: new Date("2024-03-15"),
        category: "Technology",
        description:
          "Replacement of outdated computers in the main computer lab",
      },
    ],
  },
  {
    id: "4",
    schoolId: "3",
    totalAmount: 600000,
    allocatedAmount: 400000,
    remainingAmount: 200000,
    description: "Annual Budget 2024",
    category: "General",
    createdAt: new Date("2024-01-01"),
    spendings: [
      {
        id: "15",
        name: "Teacher Professional Development",
        amount: 50000,
        date: new Date("2024-01-20"),
        category: "Staff Development",
        description: "Workshops and conferences for teacher skill enhancement",
      },
      {
        id: "16",
        name: "STEM Lab Equipment",
        amount: 75000,
        date: new Date("2024-02-05"),
        category: "Facilities",
        description: "New equipment for advanced STEM laboratory",
      },
      {
        id: "17",
        name: "Library Digital Resources",
        amount: 30000,
        date: new Date("2024-02-20"),
        category: "Educational Materials",
        description: "Subscription to online research databases and e-books",
      },
      {
        id: "18",
        name: "Counseling Services",
        amount: 60000,
        date: new Date("2024-03-05"),
        category: "Student Services",
        description: "Expansion of school counseling program",
      },
      {
        id: "19",
        name: "Energy Efficiency Upgrades",
        amount: 80000,
        date: new Date("2024-03-20"),
        category: "Facilities",
        description:
          "Installation of solar panels and LED lighting throughout the school",
      },
      {
        id: "20",
        name: "Extracurricular Clubs Funding",
        amount: 25000,
        date: new Date("2024-04-05"),
        category: "Student Activities",
        description: "Support for various student clubs and organizations",
      },
      {
        id: "21",
        name: "Campus Security System",
        amount: 80000,
        date: new Date("2024-04-20"),
        category: "Safety",
        description:
          "Installation of new security cameras and access control systems",
      },
    ],
  },
];

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export default function BudgetProvider({ children }: { children: ReactNode }) {
  const [schools] = useState<School[]>(dummySchools);
  const [budgets, setBudgets] = useState<Budget[]>(dummyBudgets);

  const allocateBudget = (
    schoolId: string,
    amount: number,
    description: string
  ) => {
    const newBudget: Budget = {
      id: (budgets.length + 1).toString(),
      schoolId,
      totalAmount: amount,
      allocatedAmount: 0,
      remainingAmount: amount,
      description,
      category: "New Allocation",
      createdAt: new Date(),
      spendings: [],
    };
    setBudgets([...budgets, newBudget]);
  };

  const addSpending = (
    budgetId: string,
    spending: Omit<SpendingItem, "id">
  ) => {
    setBudgets(
      budgets.map((budget) => {
        if (budget.id === budgetId) {
          const newSpending = {
            ...spending,
            id: (budget.spendings.length + 1).toString(),
          };
          const newAllocatedAmount = budget.allocatedAmount + spending.amount;
          return {
            ...budget,
            allocatedAmount: newAllocatedAmount,
            remainingAmount: budget.totalAmount - newAllocatedAmount,
            spendings: [...budget.spendings, newSpending],
          };
        }
        return budget;
      })
    );
  };

  return (
    <BudgetContext.Provider
      value={{ schools, budgets, allocateBudget, addSpending }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
