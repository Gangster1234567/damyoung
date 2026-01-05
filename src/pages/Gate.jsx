import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gate() {
  const nav = useNavigate();
  const inputRef = useRef(null);

  const ANSWER = "0608";

  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChange(e) {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(v);
  }

  function fail(text) {
    setMsg(text);
    setShake(true);
    setTimeout(() => setShake(false), 260);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (pin.length !== 4) return fail("4자리로 입력해줘");
    if (pin !== ANSWER) {
      setPin("");
      return fail("땡! 다시 생각해봐 💭");
    }
    nav("/home", { replace: true });
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
          />
        </form>

        <div className="gate2-hint">HINT: MMDD</div>
        {msg && <div className="gate2-msg">{msg}</div>}
      </div>
    </div>
  );
}
