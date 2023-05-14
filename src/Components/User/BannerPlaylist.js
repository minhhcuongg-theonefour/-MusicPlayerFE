import React, { useState } from "react";
import artist from "../../img/artist.jpg";
import check from "../../img/check.png";
import { FaEllipsisH, FaHeadphones, FaCheck } from "react-icons/fa";
import RenamePlaylistDialog from "./RenamePlaylistDialog";
import { useUpdatePlaylistMutation } from "../../services/playlistAPIs";
function BannerPlaylist({ playlist, id }) {
  const [openDialog, setOpenDialog] = useState(false);


  const handleOpenRenameDialog = () => {
    console.log("this clicked");
    setOpenDialog(true);
  };

  return (
    <div className="Banner">
      <img src={playlist?.image} alt="" className="bannerImg" />

      <div className="content">
        <div className="breadCrump">
          {/* <p>
            Home <span>/Popular Artist</span>
          </p> */}
          {/* <i onClick={handleOpenRenameDialog}>
            <FaEllipsisH />
          </i> */}
        </div>
        <div>
          <RenamePlaylistDialog open={handleOpenRenameDialog} id={id} />
        </div>
        <div className="artist">
          <div className="left">
            <div className="name">
              <h2>{playlist?.name}</h2>
            </div>

            <p>
              <i>
                <FaHeadphones />
              </i>
              <span>Your private playlist</span>
            </p>
          </div>

          <div className="right">
            <a href="#"> Play</a>
          </div>
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export { BannerPlaylist };
