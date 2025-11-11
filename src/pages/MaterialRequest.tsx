import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MaterialRequest() {
  const [view, setView] = useState<"list" | "form">("list");

  const materialRequests = [
    { id: "MAT-MR-2024-00012", date: "2024-10-08", purpose: "Purchase", items: 3, status: "Pending", requiredBy: "2024-10-15" },
    { id: "MAT-MR-2024-00011", date: "2024-10-07", purpose: "Purchase", items: 5, status: "Approved", requiredBy: "2024-10-14" },
    { id: "MAT-MR-2024-00010", date: "2024-10-06", purpose: "Transfer", items: 2, status: "Ordered", requiredBy: "2024-10-13" },
    { id: "MAT-MR-2024-00009", date: "2024-10-05", purpose: "Purchase", items: 4, status: "Completed", requiredBy: "2024-10-12" },
  ];

  const [items, setItems] = useState([
    { itemCode: "FABRIC-COT-BLK", requiredBy: "2024-10-15", description: "Cotton Fabric - Black - 180 GSM", quantity: 500, uom: "Meters", warehouse: "Raw Material Store" }
  ]);

  if (view === "form") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Material Request</h1>
            <p className="text-sm text-muted-foreground">MAT-MR-2024-00013</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setView("list")}>Cancel</Button>
            <Button variant="outline">Print</Button>
            <Button>Submit</Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="items">Items</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Workflow State</Label>
                    <Badge className="w-fit">Pending</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Date</Label>
                    <Input type="date" defaultValue="2024-10-08" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select defaultValue="purchase">
                      <SelectTrigger id="purpose">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="required-by">Required By</Label>
                    <Input type="date" id="required-by" defaultValue="2024-10-15" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Sr</TableHead>
                      <TableHead>Item Code</TableHead>
                      <TableHead>Required By</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>UOM</TableHead>
                      <TableHead>Target Warehouse</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Input defaultValue={item.itemCode} className="h-8" />
                        </TableCell>
                        <TableCell>
                          <Input type="date" defaultValue={item.requiredBy} className="h-8" />
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={item.description} className="h-8" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={item.quantity} className="h-8 w-20" />
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={item.uom} className="h-8 w-20" />
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={item.warehouse} className="h-8" />
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setItems(items.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button 
                  variant="outline" 
                  onClick={() => setItems([...items, { 
                    itemCode: "", 
                    requiredBy: "2024-10-15", 
                    description: "", 
                    quantity: 1, 
                    uom: "Meters", 
                    warehouse: "Raw Material Store" 
                  }])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Material Request</h1>
          <p className="text-muted-foreground">Create and manage material requisitions</p>
        </div>
        <Button onClick={() => setView("form")}>
          <Plus className="h-4 w-4 mr-2" />
          New Material Request
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Material Requests</CardTitle>
              <CardDescription>All material request records</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Required By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialRequests.map((mr) => (
                <TableRow 
                  key={mr.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setView("form")}
                >
                  <TableCell className="font-medium text-primary">{mr.id}</TableCell>
                  <TableCell>{mr.date}</TableCell>
                  <TableCell>{mr.purpose}</TableCell>
                  <TableCell>{mr.items} items</TableCell>
                  <TableCell>{mr.requiredBy}</TableCell>
                  <TableCell>
                    <Badge variant={
                      mr.status === "Completed" ? "default" : 
                      mr.status === "Approved" ? "secondary" : 
                      "outline"
                    }>
                      {mr.status}
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
