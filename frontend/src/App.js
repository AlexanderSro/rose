import { Container } from "react-bootstrap";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginRegScreen from "./screens/LoginRegScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SummaryScreen from "./screens/SummaryScreen";


function MainContent() {
  const location = useLocation();
  const pathname = location.pathname;
  const shouldShowHero = !(
    pathname.endsWith("/login") || pathname.endsWith("/login/")
  );

  return (
    <main
      className="py-3"
      style={{
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: "cover",
      }}
    >
      <Header />
      {shouldShowHero && <Hero />}
      <Container>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route path="/shipping/" element={<ShippingScreen />} />
          <Route path="/login/" element={<LoginRegScreen />} />
          <Route path="/profile/" element={<ProfileScreen />} />
          <Route path="/summary/" element={<SummaryScreen />} />
        </Routes>
      </Container>
      <Footer />
    </main>
  );
}

function App() {
  console.log("Router is being rendered");

  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;
