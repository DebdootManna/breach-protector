"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, Globe, Lock, Mail, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DataBreachCardProps {
  breach: {
    id: string;
    name: string;
    domain: string;
    breachDate: string;
    addedDate: string;
    dataClasses: string[];
    description: string;
    exposureType: "surface" | "deep";
    isResolved: boolean;
  };
}

export function DataBreachCard({ breach }: DataBreachCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getDataTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "email addresses":
        return <Mail className="h-3 w-3" />;
      case "passwords":
        return <Lock className="h-3 w-3" />;
      case "credit cards":
        return <CreditCard className="h-3 w-3" />;
      default:
        return <Globe className="h-3 w-3" />;
    }
  };

  return (
    <Card className={breach.isResolved ? "border-muted" : "border-destructive"}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {!breach.isResolved && <AlertTriangle className="h-4 w-4 text-destructive" />}
              {breach.name}
            </CardTitle>
            <CardDescription>{breach.domain}</CardDescription>
          </div>
          <Badge variant={breach.exposureType === "deep" ? "destructive" : "secondary"}>
            {breach.exposureType === "deep" ? "Dark Web" : "Surface Web"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span>Breached {formatDistanceToNow(new Date(breach.breachDate), { addSuffix: true })}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {breach.dataClasses.slice(0, 5).map((type) => (
            <Badge key={type} variant="outline" className="flex items-center gap-1">
              {getDataTypeIcon(type)}
              {type}
            </Badge>
          ))}
          {breach.dataClasses.length > 5 && (
            <Badge variant="outline">+{breach.dataClasses.length - 5} more</Badge>
          )}
        </div>
        {expanded && (
          <div className="mt-3 text-sm">
            <p>{breach.description}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Less details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" /> More details
            </>
          )}
        </Button>
        {!breach.isResolved && (
          <Button size="sm" variant="default">Take Action</Button>
        )}
      </CardFooter>
    </Card>
  );
}