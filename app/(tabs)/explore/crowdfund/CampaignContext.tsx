// import React, { createContext, useState, useContext, ReactNode } from "react";

// interface Campaign {
//   id: string;
//   name: string;
//   description: string;
//   minContribution: string;
//   targetAmount: string;
//   image: string | null;
//   status: "pending" | "active" | "completed" | "stopped";
//   amountCollected: string;
// }

// interface CampaignContextType {
//   campaigns: Campaign[];
//   addCampaign: (
//     campaign: Omit<Campaign, "id" | "status" | "amountCollected">
//   ) => void;
//   editCampaign: (id: string, campaign: Partial<Campaign>) => void;
//   startCampaign: (id: string) => void;
//   stopCampaign: (id: string) => void;
//   withdrawRequest: (id: string) => void;
//   approveFundTransfer: (id: string) => void;
// }

// const CampaignContext = createContext<CampaignContextType | undefined>(
//   undefined
// );

// export const useCampaignContext = () => {
//   const context = useContext(CampaignContext);
//   if (!context) {
//     throw new Error(
//       "useCampaignContext must be used within a CampaignProvider"
//     );
//   }
//   return context;
// };

// const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);

//   const addCampaign = (
//     campaign: Omit<Campaign, "id" | "status" | "amountCollected">
//   ) => {
//     const newCampaign: Campaign = {
//       ...campaign,
//       id: Date.now().toString(),
//       status: "pending",
//       amountCollected: "0",
//     };
//     setCampaigns([...campaigns, newCampaign]);
//   };

//   const editCampaign = (id: string, updatedCampaign: Partial<Campaign>) => {
//     setCampaigns(
//       campaigns.map((campaign) =>
//         campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
//       )
//     );
//   };

//   const startCampaign = (id: string) => {
//     editCampaign(id, { status: "active" });
//   };

//   const stopCampaign = (id: string) => {
//     editCampaign(id, { status: "stopped" });
//   };

//   const withdrawRequest = (id: string) => {
//     // Implement blockchain or metamask integration here
//     console.log(`Withdraw request for campaign ${id}`);
//   };

//   const approveFundTransfer = (id: string) => {
//     // Implement fund transfer logic here
//     console.log(`Fund transfer approved for campaign ${id}`);
//   };

//   return (
//     <CampaignContext.Provider
//       value={{
//         campaigns,
//         addCampaign,
//         editCampaign,
//         startCampaign,
//         stopCampaign,
//         withdrawRequest,
//         approveFundTransfer,
//       }}
//     >
//       {children}
//     </CampaignContext.Provider>
//   );
// };

// export default CampaignProvider;

import React, { createContext, useState, useContext, ReactNode } from "react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  minContribution: string;
  targetAmount: string;
  image: string | null;
  status: "pending" | "active" | "completed" | "stopped";
  amountCollected: string;
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (
    campaign: Omit<Campaign, "id" | "status" | "amountCollected">
  ) => void;
  editCampaign: (id: string, campaign: Partial<Campaign>) => void;
  startCampaign: (id: string) => void;
  stopCampaign: (id: string) => void;
  withdrawRequest: (id: string) => void;
  approveFundTransfer: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error(
      "useCampaignContext must be used within a CampaignProvider"
    );
  }
  return context;
};

const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Clean Water Project",
      description: "Providing clean water to rural areas.",
      minContribution: "10",
      targetAmount: "5000",
      image: null,
      status: "active",
      amountCollected: "2500",
    },
    {
      id: "2",
      name: "School Renovation",
      description: "Renovating schools in underprivileged areas.",
      minContribution: "50",
      targetAmount: "20000",
      image: null,
      status: "pending",
      amountCollected: "0",
    },
    {
      id: "3",
      name: "Tree Planting Initiative",
      description: "Planting trees to combat deforestation.",
      minContribution: "5",
      targetAmount: "3000",
      image: null,
      status: "completed",
      amountCollected: "3000",
    },
  ]);

  const addCampaign = (
    campaign: Omit<Campaign, "id" | "status" | "amountCollected">
  ) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      status: "pending",
      amountCollected: "0",
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const editCampaign = (id: string, updatedCampaign: Partial<Campaign>) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
      )
    );
  };

  const startCampaign = (id: string) => {
    editCampaign(id, { status: "active" });
  };

  const stopCampaign = (id: string) => {
    editCampaign(id, { status: "stopped" });
  };

  const withdrawRequest = (id: string) => {
    // Implement blockchain or metamask integration here
    console.log(`Withdraw request for campaign ${id}`);
  };

  const approveFundTransfer = (id: string) => {
    // Implement fund transfer logic here
    console.log(`Fund transfer approved for campaign ${id}`);
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        addCampaign,
        editCampaign,
        startCampaign,
        stopCampaign,
        withdrawRequest,
        approveFundTransfer,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
