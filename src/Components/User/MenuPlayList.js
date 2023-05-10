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

function MenuPlayList() {
  const [createPlaylist] = useCreatePlaylistMutation();

  const { data, isFetching } = useGetPlaylistQuery("userPlaylist", {
    refetchOnMountOrArgChange: true,
  });

  const [removePlaylist] = useRemovePlaylistMutation();

  const hanldeCreatePlaylist = async (e) => {
    await createPlaylist({ name: "Unnamed playlist" });
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
              <p>{list?.name}</p>
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
