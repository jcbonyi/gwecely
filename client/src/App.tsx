import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminProductEditPage from "@/pages/admin/AdminProductEditPage";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Home from "./pages/Home";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/admin/products"} component={AdminProductsPage} />
      <Route path={"/admin/products/:id"} component={AdminProductEditPage} />
      <Route path={"/admin"}>
        <Redirect to="/admin/products" />
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const content = (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster position="top-right" richColors />
              <Router />
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );

  if (!clerkPubKey) {
    console.warn('VITE_CLERK_PUBLISHABLE_KEY not set — admin sign-in disabled');
    return content;
  }

  return <ClerkProvider publishableKey={clerkPubKey}>{content}</ClerkProvider>;
}

export default App;
