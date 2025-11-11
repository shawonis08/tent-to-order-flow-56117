import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Package, ShoppingCart, AlertCircle, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Pending MRs", value: "12", change: "+2", trend: "up", icon: Package },
    { label: "Active POs", value: "24", change: "-3", trend: "down", icon: ShoppingCart },
    { label: "Awaiting Receipt", value: "8", change: "+1", trend: "up", icon: AlertCircle },
    { label: "Completed Today", value: "15", change: "+5", trend: "up", icon: CheckCircle },
  ];

  const recentMRs = [
    { id: "MAT-MR-2024-00012", date: "2024-10-08", items: 3, status: "Pending", requiredBy: "2024-10-15" },
    { id: "MAT-MR-2024-00011", date: "2024-10-07", items: 5, status: "Approved", requiredBy: "2024-10-14" },
    { id: "MAT-MR-2024-00010", date: "2024-10-06", items: 2, status: "Ordered", requiredBy: "2024-10-13" },
    { id: "MAT-MR-2024-00009", date: "2024-10-05", items: 4, status: "Completed", requiredBy: "2024-10-12" },
  ];

  const activePOs = [
    { id: "PUR-ORD-2024-00018", supplier: "Apex Textile Mills", amount: "৳125,500", status: "Draft", date: "2024-10-08" },
    { id: "PUR-ORD-2024-00017", supplier: "Prime Fabrics Ltd", amount: "৳87,750", status: "Submitted", date: "2024-10-07" },
    { id: "PUR-ORD-2024-00016", supplier: "Fashion Accessories Co", amount: "৳45,200", status: "Confirmed", date: "2024-10-06" },
  ];

  const procurementTrend = [
    { month: "Apr", value: 45000 },
    { month: "May", value: 52000 },
    { month: "Jun", value: 48000 },
    { month: "Jul", value: 61000 },
    { month: "Aug", value: 55000 },
    { month: "Sep", value: 67000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of procurement activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Procurement Trend</CardTitle>
            <CardDescription>Monthly procurement value (last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2 pt-4">
              {procurementTrend.map((item, i) => {
                const maxValue = Math.max(...procurementTrend.map(p => p.value));
                const height = (item.value / maxValue) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary rounded-t" style={{ height: `${height}%` }}>
                      <div className="text-xs text-white text-center pt-2">
                        ৳{(item.value / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stock Balance Overview</CardTitle>
            <CardDescription>Current inventory status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Raw Materials</p>
                  <p className="text-2xl font-bold">3,245</p>
                </div>
                <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center">
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Finished T-Shirts</span>
                  <span className="font-medium">12,450 pcs</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>In Production</span>
                  <span className="font-medium">3,250 pcs</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Low Stock Items</span>
                  <span className="font-medium text-destructive">8 items</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <Tabs defaultValue="material-requests" className="w-full">
        <TabsList>
          <TabsTrigger value="material-requests">Recent Material Requests</TabsTrigger>
          <TabsTrigger value="purchase-orders">Active Purchase Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="material-requests">
          <Card>
            <CardHeader>
              <CardTitle>Material Requests</CardTitle>
              <CardDescription>Latest material request activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Required By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentMRs.map((mr) => (
                    <TableRow key={mr.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">{mr.id}</TableCell>
                      <TableCell>{mr.date}</TableCell>
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
        </TabsContent>

        <TabsContent value="purchase-orders">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Currently active purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activePOs.map((po) => (
                    <TableRow key={po.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium text-primary">{po.id}</TableCell>
                      <TableCell>{po.supplier}</TableCell>
                      <TableCell className="font-medium">{po.amount}</TableCell>
                      <TableCell>{po.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          po.status === "Confirmed" ? "default" : 
                          po.status === "Submitted" ? "secondary" : 
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
