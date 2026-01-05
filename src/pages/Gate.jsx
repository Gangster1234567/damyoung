import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gate() {
  const nav = useNavigate();
  const inputRef = useRef(null);

  const ANSWER = "0608";

  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [msg, setMsg] = useState("");

  // 흔들림/메시지
  function fail(text) {
    setMsg(text);
    setShake(true);
    setTimeout(() => setShake(false), 260);
  }

  // 자동 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ✅ 4자리 입력되는 즉시 자동 판정 (모바일 엔터 문제 해결)
  useEffect(() => {
    if (pin.length !== 4) {
      // 입력 중에는 메시지 지우고 싶으면 이 줄 유지
      if (msg) setMsg("");
      return;
    }

    if (pin !== ANSWER) {
      setPin("");
      // 포커스 다시 주기 (모바일에서 가끔 풀림)
      requestAnimationFrame(() => inputRef.current?.focus());
      return fail("땡! 다시 생각해봐 💭");
    }

    nav("/home", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]); // nav는 보통 deps에 넣어도 되지만, 여기선 pin 트리거만 써도 충분

  function onChange(e) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(v);
  }

  // (선택) 엔터 되는 환경도 대비해서 submit 유지
  function onSubmit(e) {
    e.preventDefault();
    // 엔터로 제출해도 같은 로직 타게: pin 변경이 트리거라 굳이 안 써도 되지만 안전빵
    if (pin.length !== 4) return fail("4자리로 입력해줘");
    // 4자리면 useEffect가 처리함
  }

  return (
    <div className="gate2-wrap">
      <div className={`gate2-inner ${shake ? "shake" : ""}`}>
        <div className="gate2-title">PASSWORD</div>

        <form className="gate2-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="gate2-input"
            value={pin}
            onChange={onChange}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder=""
            aria-label="비밀문 비밀번호 (MMDD)"
            // ✅ iOS에서 숫자 키패드 + 완료 버튼이 좀 더 잘 뜨게 도움
            enterKeyHint="done"
          />
        </form>

        <div className="gate2-hint">HINT: MMDD</div>
        {msg && <div className="gate2-msg">{msg}</div>}
      </div>
    </div>
  );
}
