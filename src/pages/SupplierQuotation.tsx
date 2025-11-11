import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw } from "lucide-react";

export default function SupplierQuotation() {
  const quotations = [
    { supplier: "Boote Jirsa", item: "43567-BLA", uom: "Unit", quantity: 50, price: 8760, pricePerUnit: 175.20, total: 750000, sqValue: 15000, sqId: "PUR-SQTN-2" },
    { supplier: "Boote Jirsa", item: "43567-BLU", uom: "Unit", quantity: 30, price: 4204.80, pricePerUnit: 140.16, total: 360000, sqValue: 12000, sqId: "PUR-SQTN-2" },
    { supplier: "Gena Alexsandrovich", item: "43567-BLA", uom: "Unit", quantity: 50, price: 9928, pricePerUnit: 198.56, total: 850000, sqValue: 17000, sqId: "PUR-SQTN-2" },
    { supplier: "Gena Alexsandrovich", item: "43567-BLU", uom: "Unit", quantity: 30, price: 4555.20, pricePerUnit: 151.84, total: 390000, sqValue: 13000, sqId: "PUR-SQTN-2" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Supplier Quotation Comparison</h1>
          <p className="text-muted-foreground">Compare and analyze supplier quotes</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CardTitle>Quotation Comparison</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Nova Gadget Group</span>
                <span className="text-sm text-muted-foreground">01-01-2022</span>
                <span className="text-sm text-muted-foreground">to</span>
                <span className="text-sm text-muted-foreground">01-01-2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">PUR-RFQ-2023-00005</span>
                <Select defaultValue="supplier">
                  <SelectTrigger className="w-48 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Group by Supplier</SelectItem>
                    <SelectItem value="item">Group by Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>Valid till :</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Expires in a week or less
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Expires today / Already Expired
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>UOM</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock UOM</TableHead>
                  <TableHead>Price per Unit</TableHead>
                  <TableHead>Price (BDT)</TableHead>
                  <TableHead>Price Per Unit (BDT)</TableHead>
                  <TableHead>Supplier Quotation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((quote, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{quote.supplier}</TableCell>
                    <TableCell>{quote.item}</TableCell>
                    <TableCell>{quote.uom}</TableCell>
                    <TableCell>{quote.quantity.toFixed(3)}</TableCell>
                    <TableCell>BDT</TableCell>
                    <TableCell>৳ {quote.price.toLocaleString()}</TableCell>
                    <TableCell>{quote.uom}</TableCell>
                    <TableCell>৳ {quote.pricePerUnit.toFixed(2)}</TableCell>
                    <TableCell>৳ {quote.total.toLocaleString()}</TableCell>
                    <TableCell>৳ {quote.sqValue.toLocaleString()}</TableCell>
                    <TableCell className="text-primary">{quote.sqId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            For comparison, use &gt;5, &lt;10 or =324. For ranges, use 5:10 (for values between 5 & 10).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
