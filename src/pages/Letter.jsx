import { useNavigate } from "react-router-dom";

export default function Letter() {
  const nav = useNavigate();

  return (
    <div className="letter-wrap">
      <h1 className="letter-title">LETTER</h1>

      <div className="letter-center">
        <div className="letter-content">
          <p className="letter-text">
            아기 담영아 생일 축하해<br />
            내 편지를 읽어 줄래?
          </p>

          <div className="letter-button">
            <button className="time-btn" onClick={() => nav("/home")} type="button">
          집으로!
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}
