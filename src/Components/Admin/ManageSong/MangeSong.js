import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, IconButton, Stack } from "@mui/material";
import DialogDeleleSong from "./DialogDeleleSong";
import { useGetSongsQuery } from "../../../services/songAPIs";
import { Button } from "@mui/material";
import useStyles from "./styles";

export default function MangeSong() {
  const classes = useStyles();

  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const { data, isFetching } = useGetSongsQuery("Allsongs", {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  const handleOpenEditDialog = () => {
    console.log("this clicked");
    setOpenDialog(true);
  };

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
      label: "Song name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "singer",
      label: "Singer",
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
      name: "duration",
      label: "Song's duration",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    // filterType: "checkbox",
    // onRowClick: (rowData) => {
    //   console.log("Row clicked:");
    //   navigate(`/admin/manage-song-details/${rowData[0]}`);
    // },
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
    <>
      <Link to="/admin/add-song">
        <Button
          variant="contained"
          sx={{
            my: 1,
            backgroundColor: "#3498db",
            "&:hover": {
              backgroundColor: "#27b7b7",
            },
          }}
        >
          Create new song
        </Button>
      </Link>
      <MUIDataTable
        title={"Song list"}
        data={data}
        columns={columns}
        options={{
          ...options,
          customBodyRender: (value, tableMeta, updateValue) => (
            <div className={classes.centerCell}>{value}</div>
          ),
        }}
      />
    </>
  );
}
