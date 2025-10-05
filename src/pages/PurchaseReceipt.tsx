import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";

export default function PurchaseReceipt() {
  const receipts = [
    { id: "MAT-PRE-2024-00008", po: "PUR-ORD-2024-00016", supplier: "Beta Components", date: "2024-10-08", status: "Completed" },
    { id: "MAT-PRE-2024-00007", po: "PUR-ORD-2024-00015", supplier: "Vision Tech Ltd", date: "2024-10-07", status: "Pending" },
    { id: "MAT-PRE-2024-00006", po: "PUR-ORD-2024-00014", supplier: "Alpha Materials", date: "2024-10-06", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchase Receipt</h1>
          <p className="text-muted-foreground">Receive goods in desired warehouse</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Receipt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Receipts</CardTitle>
              <CardDescription>All goods receipt records</CardDescription>
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
                <TableHead>Receipt ID</TableHead>
                <TableHead>Purchase Order</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map((receipt) => (
                <TableRow key={receipt.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">{receipt.id}</TableCell>
                  <TableCell className="text-primary">{receipt.po}</TableCell>
                  <TableCell>{receipt.supplier}</TableCell>
                  <TableCell>{receipt.date}</TableCell>
                  <TableCell>
                    <Badge variant={receipt.status === "Completed" ? "default" : "outline"}>
                      {receipt.status}
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
