import { useNavigate } from "react-router-dom";

import cat from "../assets/photos/cat.png";
import ko from "../assets/photos/ko.png";
import kim from "../assets/photos/kim.png";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home-wrap">
      {/* 고양이 */}
      <img src={cat} alt="cat" className="home-cat" />

      {/* 타이틀 */}
      <h1 className="home-title">HOME</h1>

      {/* 메뉴 버튼 */}
      <div className="home-menu">
        <button onClick={() => nav("/letter")}>LETTER</button>
        <button onClick={() => nav("/time")}>TIME</button>
        <button onClick={() => nav("/quiz")}>QUIZ</button>
      </div>

      {/* 커플 */}
      <div className="home-couple">
        <img src={ko} alt="ko" />
        <img src={kim} alt="kim" />
      </div>
    </div>
  );
}
