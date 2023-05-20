import React from "react";
import MUIDataTable from "mui-datatables";
import { Card } from "@mui/joy";
import { useGetAllUserQuery } from "../../services/userApi";

export default function Dashboard() {
  const { data, isFetching } = useGetAllUserQuery();

  const columns = [
    {
      name: "id",
      label: " ID",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "username",
      label: "User name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "full_name",
      label: "Full name",
      options: {
        filter: false,
        sort: true,
      },
      customBodyRender: (value) => {
        return value ? value : "not set"; // Kiểm tra giá trị, nếu chuỗi trống thì hiển thị "not set"
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    customToolbarSelect: () => (
      <>
        {/* <Stack spacing={2} direction="row">
          <IconButton>
            <DialogDeleleSong open={handleOpenEditDialog} />
          </IconButton>
        </Stack> */}
      </>
    ),
  };
  return (
    <MUIDataTable
      title={"User"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}
