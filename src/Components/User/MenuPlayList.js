import React from "react";
import "../../styles/LeftMenu.css";
import { FaPlus } from "react-icons/fa";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";
import { PlayList } from "./PlayList";
import {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
  useRemovePlaylistMutation,
} from "../../services/playlistAPIs";
import { useNavigate } from "react-router-dom";

function MenuPlayList() {
  const navigate = useNavigate();

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
  };

  const handleDelete = async (id) => {
    await removePlaylist(id);
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
              <p onClick={() => navigate(`/user/playlist/${list?.id}`)}>{list?.name}</p>
              <i className="trash" onClick={() => handleDelete(list?.id)}>
                <BsTrash />
              </i>
            </div>
          ))}
      </div>
    </div>
  );
}

export { MenuPlayList };
