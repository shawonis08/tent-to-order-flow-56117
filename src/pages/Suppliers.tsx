import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";

export default function Suppliers() {
  const suppliers = [
    { name: "Apex Textile Mills", contact: "Karim Ahmed", email: "procurement@apextextile.com", rating: 4.5, orders: 45 },
    { name: "Prime Fabrics Ltd", contact: "Nasrin Sultana", email: "sales@primefabrics.com.bd", rating: 4.2, orders: 32 },
    { name: "Desh Textile Co", contact: "Rafiqul Islam", email: "info@deshtextile.com", rating: 4.8, orders: 58 },
    { name: "Fashion Accessories Co", contact: "Shirin Akhter", email: "orders@fashionacc.com.bd", rating: 4.0, orders: 28 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Onboard and manage supplier master</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Supplier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Supplier Directory</CardTitle>
              <CardDescription>All registered suppliers</CardDescription>
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
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Total Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.name} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell className="text-primary">{supplier.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < Math.floor(supplier.rating) ? "text-yellow-500" : "text-gray-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{supplier.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{supplier.orders}</Badge>
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
