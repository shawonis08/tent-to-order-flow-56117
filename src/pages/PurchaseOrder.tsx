import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Printer } from "lucide-react";

export default function PurchaseOrder() {
  const [view, setView] = useState<"list" | "form">("list");

  const purchaseOrders = [
    { id: "PUR-ORD-2024-00018", supplier: "Vision Tech Ltd", date: "2024-10-08", amount: "৳12,500", status: "Draft" },
    { id: "PUR-ORD-2024-00017", supplier: "Alpha Materials", date: "2024-10-07", amount: "৳8,750", status: "Submitted" },
    { id: "PUR-ORD-2024-00016", supplier: "Beta Components", date: "2024-10-06", amount: "৳15,200", status: "Confirmed" },
    { id: "PUR-ORD-2024-00015", supplier: "Vision Tech Ltd", date: "2024-10-05", amount: "৳9,800", status: "Completed" },
  ];

  if (view === "form") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Purchase Order</h1>
            <p className="text-sm text-muted-foreground">PUR-ORD-2024-00019</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button>Submit</Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">Purchase Order</h2>
                  <p className="text-sm text-muted-foreground">PUR-ORD-2024-00019</p>
                </div>
                <Badge variant="outline" className="text-lg px-4 py-1">DRAFT</Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier Name</Label>
                    <Input id="supplier" defaultValue="New Vision Optics" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input type="date" id="date" defaultValue="2024-10-08" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="required-by">Required By</Label>
                    <Input type="date" id="required-by" defaultValue="2024-10-15" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Sr</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">12345-WHI-256GB</div>
                          <div className="text-sm text-muted-foreground">iPhone 13-WHI-256GB</div>
                          <div className="text-xs text-muted-foreground">UOM: Unit</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Unit</span>
                          <Input type="number" defaultValue="2" className="h-8 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>৳ 600.00</TableCell>
                      <TableCell className="font-medium">৳ 1,200.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">23456-LV-256GB</div>
                          <div className="text-sm text-muted-foreground">Samsung Galaxy S-23-LV-256GB</div>
                          <div className="text-xs text-muted-foreground">UOM: Unit</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Unit</span>
                          <Input type="number" defaultValue="10" className="h-8 w-16" />
                        </div>
                      </TableCell>
                      <TableCell>৳ 400.00</TableCell>
                      <TableCell className="font-medium">৳ 4,000.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
                <div className="flex justify-end mt-4 pt-4 border-t">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span className="font-medium">৳ 5,200.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span className="font-medium">৳ 520.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>৳ 5,720.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchase Order</h1>
          <p className="text-muted-foreground">Track and manage purchase orders</p>
        </div>
        <Button onClick={() => setView("form")}>
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>All purchase order records</CardDescription>
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
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow 
                  key={po.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setView("form")}
                >
                  <TableCell className="font-medium text-primary">{po.id}</TableCell>
                  <TableCell>{po.supplier}</TableCell>
                  <TableCell>{po.date}</TableCell>
                  <TableCell className="font-medium">{po.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      po.status === "Completed" ? "default" : 
                      po.status === "Confirmed" ? "secondary" : 
                      "outline"
                    }>
                      {po.status}
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
