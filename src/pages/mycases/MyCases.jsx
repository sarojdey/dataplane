import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Context } from "../../context/Context";

import { convertToHumanReadable } from "../../utils/dateFormat";
import { useAuth } from "../../context/AuthContext";

const MyCases = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isDarkModeOn } = useContext(Context);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const filteredData = data?.filter(
      (item) => item.reporter._id === user?._id
    );

    const formattedData = filteredData?.map((item) => ({
      ...item,
      createdAt: convertToHumanReadable(item.createdAt),
      updatedAt: convertToHumanReadable(item.updatedAt),
    }));

    setTableData(formattedData);
  }, [data, user]);

  const columns = [
    { field: "ticketNumber", headerName: "Ticket ID", width: 150 },
    { field: "product", headerName: "Product", width: 200 },
    { field: "summary", headerName: "Summary", width: 300 },
    { field: "issueType", headerName: "Issue Type", minWidth: 150, flex: 1 },
    {
      field: "severity",
      headerName: "Severity",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      minWidth: 250,
      flex: 1,
    },
  ];

  const handleRowClick = (params) => {
    navigate(`/case/${params.row.ticketNumber}`, {
      state: { rowData: params.row },
    });
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f0f0",
          width: "100%",
          height: "100vh",
          paddingTop: "3rem",
        }}
      >
        {tableData.length > 0 ? (
          <div
            style={{
              borderRadius: "5px",
              overflow: "hidden",
              height: "80vh",
              width: "90%",
              margin: "auto",
            }}
          >
            {tableData && (
              <DataGrid
                onRowClick={handleRowClick}
                disableRowSelectionOnClick
                stickyHeader
                aria-label="sticky table"
                sx={{
                  backgroundColor: "white",
                  "& .MuiDataGrid-columnHeader": {
                    backgroundColor: isDarkModeOn
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                    color: "white",
                    paddingX: "2rem",
                  },
                  "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                  },
                  "& .MuiDataGrid-cell": {
                    paddingX: "2rem",
                  },
                }}
                getRowId={(data) => data?.id}
                rows={tableData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
              />
            )}
          </div>
        ) : (
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            sx={{
              color: isDarkModeOn
                ? "var(--color-primary)"
                : "var(--color-secondary)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              textAlign: "center",
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Nothing to show here.
          </Typography>
        )}
      </div>
    </>
  );
};

export default MyCases;
