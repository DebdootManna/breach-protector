import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataBreachCard } from "@/components/data-breach-card";
import { RemovalTracker } from "@/components/removal-tracker";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, FileText, RefreshCw } from "lucide-react";

// Mock data for demonstration
const breaches = [
  {
    id: "1",
    name: "LinkedIn",
    domain: "linkedin.com",
    breachDate: "2021-06-22T00:00:00Z",
    addedDate: "2021-06-29T00:00:00Z",
    dataClasses: ["Email addresses", "Passwords", "Phone numbers", "Job titles", "Social media profiles"],
    description: "In June 2021, LinkedIn experienced a data breach that exposed the data of 700 million users, approximately 92% of the total LinkedIn user base at that time. The exposed data included email addresses, phone numbers, geolocation records, genders, and other social media details.",
    exposureType: "surface" as const,
    isResolved: false
  },
  {
    id: "2",
    name: "Adobe",
    domain: "adobe.com",
    breachDate: "2020-10-15T00:00:00Z",
    addedDate: "2020-10-20T00:00:00Z",
    dataClasses: ["Email addresses", "Passwords", "Credit cards", "Subscription details"],
    description: "In October 2020, Adobe suffered a security breach that exposed customer information including email addresses and encrypted password credentials, as well as credit card information for a subset of customers.",
    exposureType: "deep" as const,
    isResolved: false
  },
  {
    id: "3",
    name: "Canva",
    domain: "canva.com",
    breachDate: "2019-05-24T00:00:00Z",
    addedDate: "2019-05-30T00:00:00Z",
    dataClasses: ["Email addresses", "Passwords", "Names", "Countries"],
    description: "In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million users. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for some users and salted and hashed with SHA-1 for others.",
    exposureType: "surface" as const,
    isResolved: true
  }
];

const removalRequests = [
  {
    id: "1",
    broker: "Acxiom",
    status: "completed" as const,
    requestDate: "2023-01-15T00:00:00Z",
    completionDate: "2023-01-25T00:00:00Z",
    dataTypes: ["Name", "Address", "Phone number"]
  },
  {
    id: "2",
    broker: "Experian",
    status: "in_progress" as const,
    requestDate: "2023-02-10T00:00:00Z",
    dataTypes: ["Credit history", "Financial data"]
  },
  {
    id: "3",
    broker: "Spokeo",
    status: "pending" as const,
    requestDate: "2023-03-05T00:00:00Z",
    dataTypes: ["Public records", "Social media data"]
  },
  {
    id: "4",
    broker: "Whitepages",
    status: "failed" as const,
    requestDate: "2023-02-20T00:00:00Z",
    dataTypes: ["Contact information", "Address history"]
  }
];

export default function DashboardPage() {
  const activeBreaches = breaches.filter(breach => !breach.isResolved);
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              Scan Now
            </Button>
            <span className="text-sm text-muted-foreground">Last scan: 2 hours ago</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72/100</div>
              <p className="text-xs text-muted-foreground">
                Moderate risk level
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Breaches</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBreaches.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeBreaches.length > 0 ? "Action required" : "No action needed"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Removal Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{removalRequests.length}</div>
              <p className="text-xs text-muted-foreground">
                {removalRequests.filter(r => r.status === "completed").length} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protected Data</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 types</div>
              <p className="text-xs text-muted-foreground">
                Email, Phone, Address
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="breaches">
          <TabsList>
            <TabsTrigger value="breaches">Data Breaches</TabsTrigger>
            <TabsTrigger value="removals">Removal Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="breaches" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {breaches.map((breach) => (
                <DataBreachCard key={breach.id} breach={breach} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="removals">
            <RemovalTracker requests={removalRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}