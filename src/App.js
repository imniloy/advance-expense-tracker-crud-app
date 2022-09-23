import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TransactionPage from "./pages/TransactionPage";


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/transactions" element={<TransactionPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
