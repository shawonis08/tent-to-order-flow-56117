import { ReactNode } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  FileText, 
  Package, 
  ClipboardList,
  Users,
  TrendingUp
} from "lucide-react";

const navigation = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Material Request", url: "/material-request", icon: ClipboardList },
  { title: "Request for Quotation", url: "/rfq", icon: FileText },
  { title: "Supplier Quotation", url: "/supplier-quotation", icon: TrendingUp },
  { title: "Comparative Statement", url: "/comparative-statement", icon: TrendingUp },
  { title: "Purchase Order", url: "/purchase-order", icon: ShoppingCart },
  { title: "Purchase Receipt", url: "/purchase-receipt", icon: Package },
  { title: "Suppliers", url: "/suppliers", icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
              E
            </div>
            <span className="font-semibold text-lg">ERP System</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Procurement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-card flex items-center px-4 gap-2 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="flex-1 flex items-center justify-between">
              <div className="max-w-md w-full">
                <input 
                  type="search" 
                  placeholder="Search or type a command (⌘ + K)"
                  className="w-full px-3 py-1.5 text-sm border rounded-md bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-accent rounded-md">
                  <span className="text-sm">Help</span>
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
