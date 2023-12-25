import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../../Components/Register";
import Login from "../../Components/Login";
import MissingRoute from "../../Components/MissingRoute.js";

const AuthNavigator = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<MissingRoute />} />
            </Routes>
        </Router>
    )
}

export default AuthNavigator