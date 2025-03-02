import { NextResponse } from 'next/server';

// Mock data broker information
const dataBrokers = {
  "1": {
    id: "1",
    name: "Acxiom",
    category: "Data Broker",
    removalProcess: "email",
    removalEmail: "optout@acxiom.com",
    removalTemplate: "I request the removal of my personal information from your database pursuant to CCPA/GDPR regulations. My information includes: {name}, {email}, {address}, {phone}."
  },
  "2": {
    id: "2",
    name: "Experian",
    category: "Credit Bureau",
    removalProcess: "form",
    removalUrl: "https://www.experian.com/privacy/opting-out",
    removalTemplate: "N/A - Web form required"
  },
  "3": {
    id: "3",
    name: "Spokeo",
    category: "People Search",
    removalProcess: "email",
    removalEmail: "privacy@spokeo.com",
    removalTemplate: "Please remove my information from your database. My information includes: {name}, {email}, {address}. This is a formal opt-out request."
  }
};

// Simulate sending removal requests
async function sendRemovalRequests(brokerIds: string[], userData: any) {
  // In a real implementation, this would send actual removal requests
  // via email, API calls, or generate forms for manual submission
  
  const results = [];
  
  for (const brokerId of brokerIds) {
    const broker = dataBrokers[brokerId as keyof typeof dataBrokers];
    
    if (!broker) {
      results.push({
        brokerId,
        success: false,
        status: "failed",
        message: "Broker not found"
      });
      continue;
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate removal request content
    let requestContent = "";
    if (broker.removalTemplate) {
      requestContent = broker.removalTemplate
        .replace("{name}", `${userData.firstName} ${userData.lastName}`)
        .replace("{email}", userData.email)
        .replace("{phone}", userData.phone || "")
        .replace("{address}", userData.address || "");
    }
    
    // Simulate success/failure (90% success rate)
    const success = Math.random() < 0.9;
    
    results.push({
      brokerId,
      brokerName: broker.name,
      success,
      status: success ? "pending" : "failed",
      requestDate: new Date().toISOString(),
      requestContent,
      message: success 
        ? `Removal request submitted to ${broker.name}` 
        : `Failed to submit request to ${broker.name}`
    });
  }
  
  return results;
}

export async function POST(request: Request) {
  try {
    const { brokerIds, userData } = await request.json();
    
    if (!brokerIds || !Array.isArray(brokerIds) || brokerIds.length === 0) {
      return NextResponse.json(
        { error: "At least one broker ID is required" },
        { status: 400 }
      );
    }
    
    if (!userData || !userData.email) {
      return NextResponse.json(
        { error: "User data with email is required" },
        { status: 400 }
      );
    }
    
    const results = await sendRemovalRequests(brokerIds, userData);
    
    return NextResponse.json({
      success: true,
      results,
      requestDate: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Error sending removal requests:", error);
    return NextResponse.json(
      { error: "Failed to send removal requests" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');
    
    if (!requestId) {
      return NextResponse.json(
        { error: "Request ID is required" },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would fetch the status from a database
    // Here we'll just return mock data
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock response data
    const mockStatus = {
      requestId,
      status: "in_progress",
      lastUpdated: new Date().toISOString(),
      brokers: [
        {
          id: "1",
          name: "Acxiom",
          status: "completed",
          requestDate: "2023-01-15T00:00:00Z",
          completionDate: "2023-01-25T00:00:00Z"
        },
        {
          id: "2",
          name: "Experian",
          status: "in_progress",
          requestDate: "2023-02-10T00:00:00Z"
        },
        {
          id: "3",
          name: "Spokeo",
          status: "pending",
          requestDate: "2023-03-05T00:00:00Z"
        }
      ]
    };
    
    return NextResponse.json(mockStatus);
    
  } catch (error) {
    console.error("Error fetching removal request status:", error);
    return NextResponse.json(
      { error: "Failed to fetch removal request status" },
      { status: 500 }
    );
  }
}