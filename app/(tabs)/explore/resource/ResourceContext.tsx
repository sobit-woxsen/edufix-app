import React, { createContext, useState, useContext } from "react";

interface Resource {
  id: string;
  name: string;
  type: string;
  school: string;
  description: string;
  availability: boolean;
}

interface ResourceRequest {
  id: string;
  resourceId: string;
  requesterName: string;
  requesterSchool: string;
  status: "pending" | "approved" | "rejected";
  date: Date;
}

interface ResourceContextType {
  resources: Resource[];
  requests: ResourceRequest[];
  addResource: (resource: Omit<Resource, "id">) => void;
  addRequest: (request: Omit<ResourceRequest, "id" | "date">) => void;
  updateRequestStatus: (id: string, status: "approved" | "rejected") => void;
}

const ResourceContext = createContext<ResourceContextType | undefined>(
  undefined
);

// Dummy data
const dummyResources: Resource[] = [
  {
    id: "1",
    name: "Computer Lab",
    type: "Technology",
    school: "Springfield Elementary",
    description: "A lab with 20 computers and high-speed internet",
    availability: true,
  },
  {
    id: "2",
    name: "Science Lab",
    type: "Laboratory",
    school: "Riverdale High",
    description:
      "Fully equipped science lab for chemistry and biology experiments",
    availability: true,
  },
  {
    id: "3",
    name: "Auditorium",
    type: "Facility",
    school: "Sunnydale School",
    description: "Large auditorium with stage and seating for 500 people",
    availability: false,
  },
];

const dummyRequests: ResourceRequest[] = [
  {
    id: "1",
    resourceId: "1",
    requesterName: "John Doe",
    requesterSchool: "Riverdale High",
    status: "pending",
    date: new Date("2023-06-01"),
  },
  {
    id: "2",
    resourceId: "2",
    requesterName: "Jane Smith",
    requesterSchool: "Springfield Elementary",
    status: "approved",
    date: new Date("2023-06-15"),
  },
];

const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resources, setResources] = useState<Resource[]>(dummyResources);
  const [requests, setRequests] = useState<ResourceRequest[]>(dummyRequests);

  const addResource = (resource: Omit<Resource, "id">) => {
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
    };
    setResources([...resources, newResource]);
  };

  const addRequest = (request: Omit<ResourceRequest, "id" | "date">) => {
    const newRequest: ResourceRequest = {
      ...request,
      id: Date.now().toString(),
      date: new Date(),
    };
    setRequests([...requests, newRequest]);
  };

  const updateRequestStatus = (id: string, status: "approved" | "rejected") => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <ResourceContext.Provider
      value={{
        resources,
        requests,
        addResource,
        addRequest,
        updateRequestStatus,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error(
      "useResourceContext must be used within a ResourceProvider"
    );
  }
  return context;
};

export default ResourceProvider;
