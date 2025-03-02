import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataBreachCard } from "@/components/data-breach-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, Filter } from "lucide-react";

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
  },
  {
    id: "4",
    name: "Dropbox",
    domain: "dropbox.com",
    breachDate: "2012-07-01T00:00:00Z",
    addedDate: "2012-07-10T00:00:00Z",
    dataClasses: ["Email addresses", "Passwords", "Names", "Countries"],
    description: "In mid-2012, Dropbox suffered a data breach which exposed the stored credentials of tens of millions of their customers. In August 2016, they forced password resets for customers they believed may be at risk. A large volume of data totaling over 68 million records was subsequently traded online.",
    exposureType: "deep" as const,
    isResolved: true
  },
  {
    id: "5",
    name: "MyFitnessPal",
    domain: "myfitnesspal.com",
    breachDate: "2018-02-01T00:00:00Z",
    addedDate: "2018-03-29T00:00:00Z",
    dataClasses: ["Email addresses", "Passwords", "Usernames"],
    description: "In February 2018, the diet and exercise service MyFitnessPal suffered a data breach. The data was subsequently put up for sale on a dark web marketplace in May 2019 and included 144 million unique email addresses alongside usernames and passwords stored as SHA-1 and bcrypt hashes.",
    exposureType: "deep" as const,
    isResolved: false
  }
];

export default function BreachesPage() {
  const activeBreaches = breaches.filter(breach => !breach.isResolved);
  const resolvedBreaches = breaches.filter(breach => breach.isResolved);
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Data Breaches</h1>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Scan for Data Breaches</CardTitle>
            <CardDescription>
              Check if your personal information has been exposed in known data breaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-9"
                  />
                </div>
              </div>
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Scan Now
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Breach History</h2>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active ({activeBreaches.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedBreaches.length})</TabsTrigger>
            <TabsTrigger value="all">All ({breaches.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {activeBreaches.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeBreaches.map((breach) => (
                  <DataBreachCard key={breach.id} breach={breach} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No active breaches</h3>
                <p className="text-muted-foreground mt-1 max-w-md">
                  Great news! We haven't detected any active data breaches for your information.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="resolved" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resolvedBreaches.map((breach) => (
                <DataBreachCard key={breach.id} breach={breach} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {breaches.map((breach) => (
                <DataBreachCard key={breach.id} breach={breach} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}