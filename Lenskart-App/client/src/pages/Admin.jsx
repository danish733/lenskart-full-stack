import React from "react";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminProduct from "../components/AdminProduct";

const Admin = () => {
  const navigate = useNavigate();
  const admintoken = localStorage.getItem("admintoken");

  return (
    <Box>
      {admintoken ? (
        <Box>
          <AdminNavbar />
          <AdminProduct/>
        </Box>
      ) : (
        navigate("/admin/login")
      )}
    </Box>
  );
};

export default Admin;
