import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import m6 from "../assets/time/m6.jpg";
import m7 from "../assets/time/m7.jpg";
import m8 from "../assets/time/m8.jpg";
import m9 from "../assets/time/m9.jpg";
import m10 from "../assets/time/m10.jpg";
import m11 from "../assets/time/m11.jpg";
import m12 from "../assets/time/m12.jpg";
import m1 from "../assets/time/m1.jpg";

export default function Time() {
  const nav = useNavigate();

  const months = useMemo(
    () => [
      { key: "m6",  month: "25년 6월",  img: m6,  text: "우리 이때는 아직 어색하고, 알아갈 길이 멀었었지? 🤭🌱" },
      { key: "m7",  month: "25년 7월",  img: m7,  text: "사랑하기 시작했고, 많이 붙어있었지💞" },
      { key: "m8",  month: "25년 8월",  img: m8,  text: "잠깐의 위기가 존재했지만 이겨낸 우리!!⚠️" },
      { key: "m9",  month: "25년 9월",  img: m9,  text: "동거 시작! 우리 감정이 날로 깊어지고 있어!🏠💗" },
      { key: "m10", month: "25년 10월", img: m10, text: "담영이가 나를 담은 뒹굴을 내 준, 서로에게 흔적이 짙어졌지🎶🖤" },
      { key: "m11", month: "25년 11월", img: m11, text: "담영이 본가에 은치 침투!!😼🚪" },
      { key: "m12", month: "25년 12월", img: m12, text: "사건사고와 이벤트가 많았던 연말이었지~💥🩼🎁" },
      { key: "m1",  month: "26년 1월",  img: m1,  text: "그리고 지금, 결혼 후 담영이 생일을 맞이하는 중💍🎂✨" },
    ],
    []
  );

  return (
    <div className="time-wrap">
      <h1 className="time-title">TIME</h1>

      {/* 타임라인 */}
      <div className="time-list">
        {months.map((item) => (
          <section key={item.key} className="time-card">
            <div className="time-photo">
              <img src={item.img} alt={item.month} />
            </div>

            <div className="time-meta">
              <div className="time-month">{item.month}</div>
              <div className="time-text">
                {item.text.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="time-actions">
        <button className="time-btn" onClick={() => nav("/home")} type="button">
          집으로!
        </button>
      </div>
    </div>
  );
}
