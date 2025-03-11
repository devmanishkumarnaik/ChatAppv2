import { useFetchData } from "6pp";
import { Avatar, Skeleton } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";
import checkpic from "/check.png";

const UserManagement = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );
  const [rows, setRows] = useState([]);
  
  // List of verified usernames
  const verifiedUsers = useMemo(() => ["Manish", "Admin", "Moderator"], []);

  const columns = useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      width: 150,
      renderCell: (params) => (
        <Avatar alt={params.row.name} src={params.row.avatar} />
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      width: 200,
      renderCell: (params) => (
        <>
          {params.value}
          {verifiedUsers.includes(params.row.username) && (
            <img 
              style={{ height: "14px", marginLeft: "2px" }} 
              src={checkpic} 
              alt="Verified" 
            />
          )}
        </>
      ),
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      width: 200,
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      width: 150,
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "table-header",
      width: 200,
    },
  ], [verifiedUsers]);

  useErrors([{ isError: error, error: error }]);

  useEffect(() => {
    if(data) {
      setRows(
        data.users.map((user) => ({
          ...user,
          id: user._id,
          avatar: transformImage(user.avatar, 50)
        }))
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}/>
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
