import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const nav = useNavigate();

  const questions = useMemo(
    () => [
      {
        q: "내가 제일 좋아하는 너의 모습은?",
        options: ["귀여운 동굴 입꼬리", "똘망똘망 바라보는 눈빛", "자고 일어나서 부어있는 왕주먹코", "전부 다"],
        answer: 3,
      },
      {
        q: "내가 너한테 제일 약한 순간은?",
        options: ["울먹이며 눈물 고일 때", "힘들고 지쳐서 안길 때", "웃으면서 나를 부를 때", "전부 다"],
        answer: 3,
      },
      {
        q: "내가 제일 좋아하는 너의 노래는?",
        options: ["뒹굴", "개꿈", "구애", "전부 다"],
        answer: 3,
      },
      {
        q: "내가 너한테 제일 고마운 이유는?",
        options: ["나를 편하게 해 줘서", "늘 내 편이라서", "나답게 있어도 괜찮게 해 줘서", "전부 다"],
        answer: 3,
      },
      {
        q: "내가 네 선물로 준비한 것은?",
        options: ["마라로제엽떡", "시집", "목발 (이건 내 거야 ㅡㅡ)", "삐에로"],
        answer: 1,
      },
    ],
    []
  );

  const total = questions.length;

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null); // 현재 문제에서 선택한 옵션 index
  const [correctCount, setCorrectCount] = useState(0);
  const [lock, setLock] = useState(false); // 한 문제에서 한 번만 선택되게 잠금
  const [done, setDone] = useState(false);

  const cur = questions[idx];
  const progress = Math.round(((idx) / total) * 100);

  const onPick = (optIndex) => {
    if (lock) return;
    setPicked(optIndex);
    setLock(true);

    if (optIndex === cur.answer) setCorrectCount((c) => c + 1);

    // 살짝 텀 주고 다음 문제로 이동 (연출)
    setTimeout(() => {
      const next = idx + 1;
      if (next >= total) {
        setDone(true);
      } else {
        setIdx(next);
        setPicked(null);
        setLock(false);
      }
    }, 650);
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setLock(false);
    setDone(false);
  };

  return (
    <div className="quiz-wrap">
      <h1 className="quiz-title">QUIZ</h1>

      {!done ? (
        <div className="quiz-card">
          <div className="quiz-top">
            <div className="quiz-count">
              Q {idx + 1} / {total}
            </div>

            <div className="quiz-progress" aria-label="progress">
              <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="quiz-question">{cur.q}</div>

          <div className="quiz-options">
            {cur.options.map((text, i) => {
              const isPicked = picked === i;
              const isAnswer = i === cur.answer;

              let cls = "quiz-option";
              if (picked !== null) {
                if (isPicked && isAnswer) cls += " ok";
                else if (isPicked && !isAnswer) cls += " no";
                else cls += " dim";
              }

              return (
                <button
                  key={i}
                  className={cls}
                  onClick={() => onPick(i)}
                  disabled={lock}
                  type="button"
                >
                  {text}
                </button>
              );
            })}
          </div>

          <div className="quiz-hint">
            {picked === null ? "하나만 골라 줘 ✨" : "좋아… 다음으로 넘어간다 😏"}
          </div>
        </div>
      ) : (
        <div className="quiz-card result">
          <div className="quiz-result-title">끝! 🎉</div>
          <div className="quiz-result-score">
            {total}문제 중 <b>{correctCount}</b>개 맞혔어
          </div>

          <div className="quiz-result-msg">
            {correctCount === total
              ? "완벽해… 이 정도면 내 마음 다 알고 있네 🥹"
              : "그래도 귀엽다… 정답은 나중에 알려줄게 😆"}
          </div>

          <div className="quiz-actions">
            <button className="quiz-btn" onClick={restart} type="button">
              담영이 다시 풀래?
            </button>
            <button className="quiz-btn primary" onClick={() => nav("/gift")} type="button">
              이제 선물 보러 갈까? 🎁
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
