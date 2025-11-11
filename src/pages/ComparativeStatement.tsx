import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, TrendingUp, Award } from "lucide-react";
import { useState } from "react";

interface QuotationData {
  item: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  total: number;
  deliveryDays: number;
  quality: number; // 1-5 rating
  pastPerformance: number; // 1-5 rating
}

export default function ComparativeStatement() {
  const [groupBy, setGroupBy] = useState<"item" | "supplier">("item");

  // Sample data - would come from API
  const quotations: QuotationData[] = [
    { item: "43567-BLA", supplier: "Boote Jirsa", quantity: 50, unitPrice: 175.20, total: 8760, deliveryDays: 7, quality: 4, pastPerformance: 4 },
    { item: "43567-BLA", supplier: "Gena Alexsandrovich", quantity: 50, unitPrice: 198.56, total: 9928, deliveryDays: 5, quality: 5, pastPerformance: 3 },
    { item: "43567-BLA", supplier: "Kumar Suppliers", quantity: 50, unitPrice: 165.00, total: 8250, deliveryDays: 10, quality: 3, pastPerformance: 5 },
    { item: "43567-BLU", supplier: "Boote Jirsa", quantity: 30, unitPrice: 140.16, total: 4204.80, deliveryDays: 7, quality: 4, pastPerformance: 4 },
    { item: "43567-BLU", supplier: "Gena Alexsandrovich", quantity: 30, unitPrice: 151.84, total: 4555.20, deliveryDays: 5, quality: 5, pastPerformance: 3 },
    { item: "43567-BLU", supplier: "Kumar Suppliers", quantity: 30, unitPrice: 138.00, total: 4140, deliveryDays: 10, quality: 3, pastPerformance: 5 },
  ];

  // Calculate merit score (weighted: 40% price, 30% delivery, 20% quality, 10% past performance)
  const calculateMerit = (quote: QuotationData, itemQuotes: QuotationData[]) => {
    const minPrice = Math.min(...itemQuotes.map(q => q.unitPrice));
    const maxPrice = Math.max(...itemQuotes.map(q => q.unitPrice));
    const minDelivery = Math.min(...itemQuotes.map(q => q.deliveryDays));
    const maxDelivery = Math.max(...itemQuotes.map(q => q.deliveryDays));

    // Normalize scores (0-100)
    const priceScore = maxPrice === minPrice ? 100 : ((maxPrice - quote.unitPrice) / (maxPrice - minPrice)) * 100;
    const deliveryScore = maxDelivery === minDelivery ? 100 : ((maxDelivery - quote.deliveryDays) / (maxDelivery - minDelivery)) * 100;
    const qualityScore = (quote.quality / 5) * 100;
    const performanceScore = (quote.pastPerformance / 5) * 100;

    return (priceScore * 0.4 + deliveryScore * 0.3 + qualityScore * 0.2 + performanceScore * 0.1).toFixed(1);
  };

  // Group data by item or supplier
  const groupedData = quotations.reduce((acc, quote) => {
    const key = groupBy === "item" ? quote.item : quote.supplier;
    if (!acc[key]) acc[key] = [];
    acc[key].push(quote);
    return acc;
  }, {} as Record<string, QuotationData[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comparative Statement</h1>
          <p className="text-muted-foreground">Merit-based supplier quotation analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suppliers Quoted</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Best Value Supplier</p>
              <p className="text-lg font-semibold">Kumar Suppliers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">₹ 1,368</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quotation Comparison & Merit Analysis</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">RFQ: PUR-RFQ-2023-00005</span>
              <Select value={groupBy} onValueChange={(v) => setGroupBy(v as "item" | "supplier")}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="item">Group by Item</SelectItem>
                  <SelectItem value="supplier">Group by Supplier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedData).map(([groupName, quotes]) => (
              <div key={groupName} className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground bg-muted px-4 py-2 rounded">
                  {groupBy === "item" ? `Item: ${groupName}` : `Supplier: ${groupName}`}
                </h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{groupBy === "item" ? "Supplier" : "Item"}</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-center">Delivery (Days)</TableHead>
                        <TableHead className="text-center">Quality</TableHead>
                        <TableHead className="text-center">Past Performance</TableHead>
                        <TableHead className="text-center">Merit Score</TableHead>
                        <TableHead className="text-center">Rank</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotes
                        .map(quote => ({
                          ...quote,
                          meritScore: parseFloat(calculateMerit(quote, quotes))
                        }))
                        .sort((a, b) => b.meritScore - a.meritScore)
                        .map((quote, index) => {
                          const isWinner = index === 0;
                          return (
                            <TableRow key={`${quote.supplier}-${quote.item}`} className={isWinner ? "bg-green-50 dark:bg-green-950/20" : ""}>
                              <TableCell className="font-medium">
                                {groupBy === "item" ? quote.supplier : quote.item}
                              </TableCell>
                              <TableCell className="text-right">{quote.quantity}</TableCell>
                              <TableCell className="text-right">₹ {quote.unitPrice.toFixed(2)}</TableCell>
                              <TableCell className="text-right">₹ {quote.total.toLocaleString()}</TableCell>
                              <TableCell className="text-center">
                                <Badge variant={quote.deliveryDays <= 7 ? "default" : "secondary"}>
                                  {quote.deliveryDays} days
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex justify-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < quote.quality ? "text-yellow-500" : "text-gray-300"}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex justify-center gap-0.5">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < quote.pastPerformance ? "text-yellow-500" : "text-gray-300"}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge variant={isWinner ? "default" : "outline"} className="font-semibold">
                                  {quote.meritScore}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                {isWinner && <Badge className="bg-green-600">🏆 Winner</Badge>}
                                {!isWinner && <span className="text-muted-foreground">#{index + 1}</span>}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>

          {/* Merit Scoring Legend */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Merit Scoring Formula</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Price:</span> 40%
              </div>
              <div>
                <span className="font-medium">Delivery Time:</span> 30%
              </div>
              <div>
                <span className="font-medium">Quality Rating:</span> 20%
              </div>
              <div>
                <span className="font-medium">Past Performance:</span> 10%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Higher merit score indicates better overall value considering all factors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
