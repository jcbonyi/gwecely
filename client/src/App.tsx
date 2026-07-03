import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import AdminProductsPage from "@/pages/admin/AdminProductsPage";
import AdminProductEditPage from "@/pages/admin/AdminProductEditPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import Home from "@/pages/Home";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import BookPage from "@/pages/BookPage";
import GalleryPage from "@/pages/GalleryPage";
import ReviewsPage from "@/pages/ReviewsPage";
import ShopPage from "@/pages/ShopPage";
import ContactPage from "@/pages/ContactPage";
import HospitalityPage from "@/pages/HospitalityPage";
import { ROUTES } from "@/lib/routes";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";

function Router() {
  return (
    <Switch>
      <Route path={ROUTES.home} component={Home} />
      <Route path={ROUTES.about} component={AboutPage} />
      <Route path={ROUTES.services} component={ServicesPage} />
      <Route path={ROUTES.book} component={BookPage} />
      <Route path={ROUTES.gallery} component={GalleryPage} />
      <Route path={ROUTES.reviews} component={ReviewsPage} />
      <Route path={ROUTES.shop} component={ShopPage} />
      <Route path={ROUTES.contact} component={ContactPage} />
      <Route path={ROUTES.hospitality} component={HospitalityPage} />
      <Route path={"/sign-in/:rest?"} component={SignInPage} />
      <Route path={"/sign-up/:rest?"} component={SignUpPage} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/admin/products"} component={AdminProductsPage} />
      <Route path={"/admin/products/:id"} component={AdminProductEditPage} />
      <Route path={"/admin/users"} component={AdminUsersPage} />
      <Route path={"/admin"}>
        <Redirect to="/admin/products" />
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
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
}

export default App;
