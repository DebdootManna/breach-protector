"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock data for demonstration
const dataBrokers = [
  { id: "1", name: "Acxiom", category: "Data Broker", difficulty: "Medium" },
  { id: "2", name: "Experian", category: "Credit Bureau", difficulty: "Hard" },
  { id: "3", name: "Spokeo", category: "People Search", difficulty: "Easy" },
  { id: "4", name: "Whitepages", category: "People Search", difficulty: "Easy" },
  { id: "5", name: "Intelius", category: "People Search", difficulty: "Medium" },
  { id: "6", name: "BeenVerified", category: "Background Check", difficulty: "Easy" },
  { id: "7", name: "PeopleFinders", category: "People Search", difficulty: "Easy" },
  { id: "8", name: "Equifax", category: "Credit Bureau", difficulty: "Hard" },
  { id: "9", name: "TransUnion", category: "Credit Bureau", difficulty: "Hard" },
  { id: "10", name: "LexisNexis", category: "Data Broker", difficulty: "Hard" },
  { id: "11", name: "Epsilon", category: "Marketing", difficulty: "Medium" },
  { id: "12", name: "Oracle Data Cloud", category: "Marketing", difficulty: "Medium" }
];

const removalRequests = [
  {
    id: "1",
    broker: "Acxiom",
    status: "completed",
    requestDate: "2023-01-15T00:00:00Z",
    completionDate: "2023-01-25T00:00:00Z",
    dataTypes: ["Name", "Address", "Phone number"]
  },
  {
    id: "2",
    broker: "Experian",
    status: "in_progress",
    requestDate: "2023-02-10T00:00:00Z",
    dataTypes: ["Credit history", "Financial data"]
  },
  {
    id: "3",
    broker: "Spokeo",
    status: "pending",
    requestDate: "2023-03-05T00:00:00Z",
    dataTypes: ["Public records", "Social media data"]
  },
  {
    id: "4",
    broker: "Whitepages",
    status: "failed",
    requestDate: "2023-02-20T00:00:00Z",
    dataTypes: ["Contact information", "Address history"]
  }
];

export default function RemovePage() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBrokers = dataBrokers.filter(broker => 
    broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    broker.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectBroker = (brokerId: string) => {
    setSelectedBrokers(prev => 
      prev.includes(brokerId)
        ? prev.filter(id => id !== brokerId)
        : [...prev, brokerId]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedBrokers.length === filteredBrokers.length) {
      setSelectedBrokers([]);
    } else {
      setSelectedBrokers(filteredBrokers.map(broker => broker.id));
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Data Removal Requests</h1>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">New Removal</TabsTrigger>
            <TabsTrigger value="active">Active Requests</TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Data Brokers</CardTitle>
                <CardDescription>
                  Choose the data brokers you want to send removal requests to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search data brokers..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="flex items-center p-4 border-b">
                      <Checkbox
                        id="select-all"
                        checked={selectedBrokers.length === filteredBrokers.length && filteredBrokers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                      <Label htmlFor="select-all" className="ml-2 flex-1 font-medium">
                        Select All
                      </Label>
                      <div className="hidden md:flex items-center gap-4">
                        <div className="w-32 font-medium">Category</div>
                        <div className="w-24 font-medium">Difficulty</div>
                      </div>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto">
                      {filteredBrokers.map((broker) => (
                        <div key={broker.id} className="flex items-center p-4 border-b last:border-0">
                          <Checkbox
                            id={`broker-${broker.id}`}
                            checked={selectedBrokers.includes(broker.id)}
                            onCheckedChange={() => handleSelectBroker(broker.id)}
                          />
                          <Label htmlFor={`broker-${broker.id}`} className="ml-2 flex-1">
                            {broker.name}
                          </Label>
                          <div className="hidden md:flex items-center gap-4">
                            <div className="w-32 text-sm text-muted-foreground">{broker.category}</div>
                            <div className="w-24">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(broker.difficulty)}`}></div>
                                <span className="text-sm">{broker.difficulty}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {selectedBrokers.length} brokers selected
                    </div>
                    <Button disabled={selectedBrokers.length === 0}>
                      Send Removal Requests
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Removal Requests</CardTitle>
                <CardDescription>
                  Track the status of your ongoing data removal requests
                </CardDescription>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>
                      {removalRequests.filter(r => r.status === "completed").length} of {removalRequests.length} completed
                    </span>
                  </div>
                  <Progress 
                    value={(removalRequests.filter(r => r.status === "completed").length / removalRequests.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {removalRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(request.status)}
                        <div>
                          <div className="font-medium">{request.broker}</div>
                          <div className="text-sm text-muted-foreground">
                            Requested {formatDistanceToNow(new Date(request.requestDate), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={request.status === "failed" ? "destructive" : "outline"}>
                          {getStatusLabel(request.status)}
                        </Badge>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request History</CardTitle>
                <CardDescription>
                  View all your past data removal requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search requests..."
                        className="pl-9"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="flex items-center p-4 border-b bg-muted/40">
                      <div className="flex-1 font-medium">Data Broker</div>
                      <div className="hidden md:flex items-center gap-4">
                        <div className="w-32 font-medium">Status</div>
                        <div className="w-32 font-medium">Request Date</div>
                        <div className="w-32 font-medium">Completion Date</div>
                      </div>
                      <div className="w-24"></div>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto">
                      {[...removalRequests].sort((a, b) => 
                        new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
                      ).map((request) => (
                        <div key={request.id} className="flex items-center p-4 border-b last:border-0">
                          <div className="flex-1 font-medium">{request.broker}</div>
                          <div className="hidden md:flex items-center gap-4">
                            <div className="w-32">
                              <Badge variant={request.status === "failed" ? "destructive" : "outline"}>
                                {getStatusLabel(request.status)}
                              </Badge>
                            </div>
                            <div className="w-32 text-sm text-muted-foreground">
                              {new Date(request.requestDate).toLocaleDateString()}
                            </div>
                            <div className="w-32 text-sm text-muted-foreground">
                              {request.completionDate 
                                ? new Date(request.completionDate).toLocaleDateString() 
                                : "-"}
                            </div>
                          </div>
                          <div className="w-24 text-right">
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}