import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const nav = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const TOTAL_MS = 3500;
  const FADEOUT_MS = 700;

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), TOTAL_MS - FADEOUT_MS);
    const t2 = setTimeout(() => nav("/gate", { replace: true }), TOTAL_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [nav]);

  return (
    <div className={`splash-wrap ${fadeOut ? "splash-fadeout" : ""}`}>
      <h1 className="splash-title">HAPPY BIRTHDAY</h1>
      <div className="splash-sub">for Damyoung</div>
    </div>
  );
}
