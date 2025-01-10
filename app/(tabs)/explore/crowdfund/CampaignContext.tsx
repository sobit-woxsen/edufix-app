import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Contribution {
  id: string; // Payment ID
  amount: string; // Contribution amount
  date: string; // Date of contribution
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  minContribution: string;
  targetAmount: string;
  image: string | null;
  status: "pending" | "active" | "requested" | "completed" | "stopped";
  amountCollected: string;
  contributions: Contribution[]; // New contributions array
  walletAddress: string; // New contributions array
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (
    campaign: Omit<
      Campaign,
      "id" | "status" | "amountCollected" | "contributions"
    >
  ) => void;
  addContribution: (id: string, paymentId: string, amount: string) => void; // New
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
      targetAmount: "500000",
      image: null,
      status: "active",
      amountCollected: "2500",
      contributions: [],
      walletAddress: "",
    },
    {
      id: "2",
      name: "School Renovation",
      description: "Renovating schools in underprivileged areas.",
      minContribution: "50",
      targetAmount: "200000",
      image: null,
      status: "pending",
      amountCollected: "0",
      contributions: [],
      walletAddress: "",
    },
    {
      id: "3",
      name: "Tree Planting Initiative",
      description: "Planting trees to combat deforestation.",
      minContribution: "5",
      targetAmount: "300000",
      image: null,
      status: "completed",
      amountCollected: "3000",
      contributions: [],
      walletAddress: "",
    },
  ]);

  const addCampaign = (
    campaign: Omit<
      Campaign,
      "id" | "status" | "amountCollected" | "contributions"
    >
  ) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      status: "pending",
      amountCollected: "0",
      contributions: [],
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  // const addContribution = (id: string, paymentId: string, amount: string) => {
  //   console.log("addContribution", id, amount, paymentId);
  //   setCampaigns(
  //     campaigns.map((campaign) =>
  //       console.log("addContribution", campaign.id, id)
  //      return campaign.id === id
  //         ? {
  //             ...campaign,
  //             amountCollected: (
  //               parseFloat(campaign.amountCollected) + parseFloat(amount)
  //             ).toString(),
  //             contributions: [
  //               ...campaign.contributions,
  //               {
  //                 id: paymentId,
  //                 amount,
  //                 date: new Date().toLocaleString(),
  //               },
  //             ],
  //           }
  //         : campaign
  //     )
  //   );
  //   console.log("CAMPAIGNS " + JSON.stringify(campaigns));
  // };

  const addContribution = (id: string, paymentId: string, amount: string) => {
    console.log("addContribution", id, amount, paymentId);

    setCampaigns(
      campaigns.map((campaign) => {
        console.log("addContribution", campaign.id, id);
        console.log("addContribution", campaign.id === id ? "YES" : "NO");
        return campaign.id === id
          ? {
              ...campaign,
              amountCollected: (
                parseFloat(campaign.amountCollected) + parseFloat(amount)
              ).toString(),
              contributions: [
                ...campaign.contributions,
                {
                  id: paymentId,
                  amount,
                  date: new Date().toLocaleString(),
                },
              ],
            }
          : campaign;
      })
    );

    console.log("CAMPAIGNS " + JSON.stringify(campaigns));
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
    editCampaign(id, { status: "requested" });
  };

  const approveFundTransfer = (id: string) => {
    editCampaign(id, { status: "completed" });
  };

  // useEffect(() => {
  //   const updatedCampaign = campaigns.find((c) => c.id === id);
  //   setCurrentCampaign(updatedCampaign);
  // }, [campaigns, id]);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        addCampaign,
        addContribution,
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

// import React, {
//   createContext,
//   useState,
//   useContext,
//   ReactNode,
//   useEffect,
// } from "react";
// import { ethers } from "ethers";

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// interface Contribution {
//   id: string; // Payment ID
//   amount: string; // Contribution amount
//   date: string; // Date of contribution
// }

// interface Campaign {
//   id: string;
//   name: string;
//   description: string;
//   minContribution: string;
//   targetAmount: string;
//   image: string | null;
//   status: "pending" | "active" | "requested" | "completed" | "stopped";
//   amountCollected: string;
//   contributions: Contribution[]; // New contributions array
//   walletAddress: string; // Add this line
// }

// interface CampaignContextType {
//   campaigns: Campaign[];
//   addCampaign: (
//     campaign: Omit<
//       Campaign,
//       "id" | "status" | "amountCollected" | "contributions"
//     >
//   ) => void;
//   addContribution: (id: string, paymentId: string, amount: string) => void;
//   editCampaign: (id: string, campaign: Partial<Campaign>) => void;
//   startCampaign: (id: string) => void;
//   stopCampaign: (id: string) => void;
//   withdrawRequest: (id: string) => void;
//   approveFundTransfer: (id: string) => void;
//   connectWallet: () => Promise<string>; // Add this line
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
//   const [campaigns, setCampaigns] = useState<Campaign[]>([
//     {
//       id: "1",
//       name: "Clean Water Project",
//       description: "Providing clean water to rural areas.",
//       minContribution: "10",
//       targetAmount: "5000",
//       image: null,
//       status: "active",
//       amountCollected: "2500",
//       contributions: [],
//       walletAddress: "", // Add this line
//     },
//     {
//       id: "2",
//       name: "School Renovation",
//       description: "Renovating schools in underprivileged areas.",
//       minContribution: "50",
//       targetAmount: "20000",
//       image: null,
//       status: "pending",
//       amountCollected: "0",
//       contributions: [],
//       walletAddress: "", // Add this line
//     },
//     {
//       id: "3",
//       name: "Tree Planting Initiative",
//       description: "Planting trees to combat deforestation.",
//       minContribution: "5",
//       targetAmount: "3000",
//       image: null,
//       status: "completed",
//       amountCollected: "3000",
//       contributions: [],
//       walletAddress: "", // Add this line
//     },
//   ]);

//   const addCampaign = (
//     campaign: Omit<
//       Campaign,
//       "id" | "status" | "amountCollected" | "contributions"
//     >
//   ) => {
//     const newCampaign: Campaign = {
//       ...campaign,
//       id: Date.now().toString(),
//       status: "pending",
//       amountCollected: "0",
//       contributions: [],
//     };
//     setCampaigns([...campaigns, newCampaign]);
//   };

//   const addContribution = (id: string, paymentId: string, amount: string) => {
//     console.log("addContribution", id, amount, paymentId);

//     setCampaigns(
//       campaigns.map((campaign) => {
//         console.log("addContribution", campaign.id, id);
//         console.log("addContribution", campaign.id === id ? "YES" : "NO");
//         return campaign.id === id
//           ? {
//               ...campaign,
//               amountCollected: (
//                 parseFloat(campaign.amountCollected) + parseFloat(amount)
//               ).toString(),
//               contributions: [
//                 ...campaign.contributions,
//                 {
//                   id: paymentId,
//                   amount,
//                   date: new Date().toLocaleString(),
//                 },
//               ],
//             }
//           : campaign;
//       })
//     );

//     console.log("CAMPAIGNS " + JSON.stringify(campaigns));
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
//     editCampaign(id, { status: "requested" });
//   };

//   const approveFundTransfer = (id: string) => {
//     editCampaign(id, { status: "completed" });
//   };

//   const connectWallet = async (): Promise<string> => {
//     try {
//       // For web (using MetaMask)
//       if (typeof window !== "undefined" && window.ethereum) {
//         await window.ethereum.request({ method: "eth_requestAccounts" });
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const address = await signer.getAddress();
//         return address;
//       }
//       // For React Native (using WalletConnect or similar)
//       else {
//         // Implement WalletConnect or another mobile wallet solution here
//         throw new Error("Wallet connection not implemented for mobile");
//       }
//     } catch (error) {
//       console.error("Failed to connect wallet", error);
//       throw new Error("Failed to connect wallet");
//     }
//   };

//   return (
//     <CampaignContext.Provider
//       value={{
//         campaigns,
//         addCampaign,
//         addContribution,
//         editCampaign,
//         startCampaign,
//         stopCampaign,
//         withdrawRequest,
//         approveFundTransfer,
//         connectWallet, // Add this line
//       }}
//     >
//       {children}
//     </CampaignContext.Provider>
//   );
// };

// export default CampaignProvider;
