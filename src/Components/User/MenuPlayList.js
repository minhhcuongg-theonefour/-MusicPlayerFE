import React, { useState } from "react";
import "../../styles/LeftMenu.css";
import { FaPlus } from "react-icons/fa";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";
import { PlayList } from "./PlayList";
import {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
  useRemovePlaylistMutation,
} from "../../services/playlistAPIs";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmDeletePlaylistDialog from "./ConfirmDeletePlaylistDialog";
import { toast } from "react-hot-toast";

function MenuPlayList() {
  const navigate = useNavigate();

  var [playlistID, setPlaylistID] = useState("");

  const [createPlaylist] = useCreatePlaylistMutation();

  const { data, isFetching } = useGetPlaylistQuery("userPlaylist", {
    refetchOnMountOrArgChange: true,
  });

  const [removePlaylist] = useRemovePlaylistMutation();

  const hanldeCreatePlaylist = async (e) => {
    await createPlaylist({
      name: "#Unnamed playlist",
      image:
        "https://res.cloudinary.com/doqhasjec/image/upload/v1683789765/B2CDMusic/defaultPlaylist_vco9j8.png",
    });
    toast.success("New playlist created");
  };

  const handleDelete = async (playlistID) => {
    await removePlaylist(playlistID);
    toast.success("Your playlist has been removed");
    navigate("/user/library");
  };

  return (
    <div className="playListContainer">
      <div className="nameContainer">
        <p>Playlists</p>
        <i onClick={hanldeCreatePlaylist}>
          <FaPlus />
        </i>
      </div>

      <div className="playListScroll">
        {!isFetching &&
          data &&
          data?.map((list) => (
            <div className="playLists" key={list?.id}>
              <i className="list">
                <BsMusicNoteList />
              </i>
              <p onClick={() => navigate(`/user/playlist/${list?.id}`)}>
                {list?.name}
              </p>
              <i className="trash">
                <ConfirmDeletePlaylistDialog
                  handleDelete={() => handleDelete(list?.id)}
                  playlistID={list?.id}
                />
              </i>
              {/* <i className="trash" onClick={() => handleDelete(list?.id)}>
                <BsTrash />
              </i> */}
            </div>
          ))}
      </div>
    </div>
  );
}

export { MenuPlayList };
