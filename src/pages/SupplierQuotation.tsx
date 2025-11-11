import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw } from "lucide-react";

export default function SupplierQuotation() {
  const quotations = [
    { supplier: "Apex Textile Mills", item: "FABRIC-COT-WHI", uom: "Meters", quantity: 500, price: 90000, pricePerUnit: 180, total: 90000, sqValue: 90000, sqId: "PUR-SQTN-2" },
    { supplier: "Apex Textile Mills", item: "THREAD-PLY-BLK", uom: "Cone", quantity: 50, price: 6000, pricePerUnit: 120, total: 6000, sqValue: 6000, sqId: "PUR-SQTN-2" },
    { supplier: "Prime Fabrics Ltd", item: "FABRIC-COT-WHI", uom: "Meters", quantity: 500, price: 95000, pricePerUnit: 190, total: 95000, sqValue: 95000, sqId: "PUR-SQTN-3" },
    { supplier: "Prime Fabrics Ltd", item: "THREAD-PLY-BLK", uom: "Cone", quantity: 50, price: 5500, pricePerUnit: 110, total: 5500, sqValue: 5500, sqId: "PUR-SQTN-3" },
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
