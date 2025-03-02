"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";

interface RemovalRequest {
  id: string;
  broker: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  requestDate: string;
  completionDate?: string;
  dataTypes: string[];
}

interface RemovalTrackerProps {
  requests: RemovalRequest[];
}

export function RemovalTracker({ requests }: RemovalTrackerProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "in_progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "pending":
        return "secondary";
      case "in_progress":
        return "default";
      case "completed":
        return "outline";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const completedRequests = requests.filter(r => r.status === "completed").length;
  const progressPercentage = (completedRequests / requests.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Removal Requests</CardTitle>
        <CardDescription>Track the status of your data removal requests</CardDescription>
        <div className="mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{completedRequests} of {requests.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between border-b pb-3">
              <div className="space-y-1">
                <div className="font-medium">{request.broker}</div>
                <div className="text-sm text-muted-foreground">
                  Requested {formatDistanceToNow(new Date(request.requestDate), { addSuffix: true })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(request.status)}>
                  {getStatusLabel(request.status)}
                </Badge>
                <Button variant="ghost" size="sm">Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}