import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";

export default function RFQ() {
  const rfqs = [
    { id: "PUR-RFQ-2025-00004", date: "2024-10-08", suppliers: 2, items: 4, status: "Draft" },
    { id: "PUR-RFQ-2025-00003", date: "2024-10-07", suppliers: 3, items: 5, status: "Sent" },
    { id: "PUR-RFQ-2025-00002", date: "2024-10-06", suppliers: 2, items: 3, status: "Received" },
    { id: "PUR-RFQ-2025-00001", date: "2024-10-05", suppliers: 4, items: 6, status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Request for Quotation</h1>
          <p className="text-muted-foreground">Send RFQ to potential suppliers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New RFQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Request for Quotations</CardTitle>
              <CardDescription>All RFQ records</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RFQ Number</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Suppliers</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rfqs.map((rfq) => (
                <TableRow key={rfq.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{rfq.id}</TableCell>
                  <TableCell>{rfq.date}</TableCell>
                  <TableCell>{rfq.suppliers} suppliers</TableCell>
                  <TableCell>{rfq.items} items</TableCell>
                  <TableCell>
                    <Badge variant={
                      rfq.status === "Completed" ? "default" : 
                      rfq.status === "Received" ? "secondary" : 
                      "outline"
                    }>
                      {rfq.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
