import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GetCustomer from './components/customer/GetCustomer';
import UpdateCustomer from './components/customer/UpdateCustomer';
import DeleteCustomer from './components/customer/DeleteCustomer';
import PaymentPage from './components/payment/Paymentpage';
import CreatePayment from './components/payment/CreatePayment';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import EmployeePayments from './components/employee/EmployeePayments';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Customer Routes */}
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <GetCustomer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateCustomer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/delete/:id"
                    element={
                        <ProtectedRoute>
                            <DeleteCustomer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute>
                            <PaymentPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <CreatePayment />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Employee Routes */}
                <Route
                    path="/employee/dashboard"
                    element={
                        <ProtectedRoute role="employee">
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/payments"
                    element={
                        <ProtectedRoute role="employee">
                            <EmployeePayments />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
