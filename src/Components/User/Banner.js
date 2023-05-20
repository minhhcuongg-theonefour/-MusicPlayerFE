import React from "react";
import artist from "../../img/artist.jpg";
import check from "../../img/check.png";
import { FaEllipsisH, FaHeadphones, FaCheck } from "react-icons/fa";
function Banner({ genreDetail, genreDetailFetching }) {
  return (
    <div className="Banner">
      <img src={genreDetail?.image} alt="" className="bannerImg" />

      <div className="content">


        <div className="artist">
          <div className="left">
            <div className="name">
              <h2>{genreDetail?.name}</h2>
              <img src={check} alt="" />
            </div>

            <p>
              <i>
                <FaHeadphones />
              </i>
              11,184,1811 <span>Monthly Listeners</span>
            </p>
          </div>

          {/* <div className="right">
            <a href="#"> Play</a>
            <a href="#">
              <i>
                <FaCheck />
              </i>
              Following
            </a>
          </div> */}
        </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
}

export { Banner };
