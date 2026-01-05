import { useNavigate } from "react-router-dom";

import gift from "../assets/photos/gift.png";

export default function Gift() {
  const nav = useNavigate();

  return (
    <div className="Gift-wrap">
      <h1 className="Gift-title">!!!!!</h1>

      <div className="Gift-img">
        <img src={gift} alt="gift" />
      </div>

    </div>
  );
}
