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

  const fail = (text) => {
    setMsg(text);
    setShake(true);
    window.setTimeout(() => setShake(false), 260);
  };

  const onChange = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);

    if (msg) setMsg("");
    setPin(v);
  };

  useEffect(() => {
    if (pin.length !== 4) return;

    if (pin !== ANSWER) {
      setPin("");
      requestAnimationFrame(() => inputRef.current?.focus());
      fail("땡! 다시 생각해봐 💭");
      return;
    }

    nav("/home", { replace: true });
  }, [pin, nav]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 4) fail("땡! 다시 생각해봐 💭");
  };

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
            enterKeyHint="done"
            aria-label="비밀문 비밀번호 (MMDD)"
          />
        </form>

        <div className="gate2-hint">HINT: MMDD</div>
        {msg && <div className="gate2-msg">{msg}</div>}
      </div>
    </div>
  );
}
