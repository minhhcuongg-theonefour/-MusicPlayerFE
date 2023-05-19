import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit, Person } from "@mui/icons-material";
import DialogEditGenres from "./DialogEditGenres";
import DialogDeleteGenres from "./DialogDeleteGenres";
import {
  useGetGenreDetailsQuery,
  useGetGenresQuery,
} from "../../../services/genresAPIs";
import DialogCreateNewGenres from "./DialogCreateNewGenres";

export default function ManageGenres() {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const { data, isFetching } = useGetGenresQuery("AllGenres", {
    refetchOnMountOrArgChange: true,
  });

  const columns = [
    {
      name: "id",
      label: " ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Genres name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image song",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <img
              style={{ width: "120px", height: "120px", borderRadius: 2 }}
              src={value}
            />
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta) => {
          const rowId = tableMeta.rowIndex;
          const genresId = tableMeta.rowData[0];
          return <DialogEditGenres genresId={genresId} />;
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "vertical",
    fixedHeader: true,
    customToolbarSelect: () => (
      <>
        {/* <Stack spacing={2} direction="row">
          <IconButton>
            <DialogDeleteGenres />
          </IconButton>
        </Stack> */}
      </>
    ),
  };
  return (
    <>
      <DialogCreateNewGenres />
      <MUIDataTable
        title={"Genres list"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
}
