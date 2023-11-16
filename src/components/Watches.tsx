import moment from "moment";
import { useEffect, useState } from "react";

interface WatchesProps {
    town: string,
    zone: number,
    remove: (town: string) => void,
}

export const Watches = ({ town, zone, remove }: WatchesProps) => {
  const [hourClass, setHourClass] = useState("");
  const [minuteClass, setMinuteClass] = useState("");
  const [secondsClass, setSecondsClass] = useState("");
  const [updated, setUpdated] = useState("");

  const getTime = () => {
    const time = moment().utcOffset(Number(zone));
    const h = time.format('h');
    let m = time.format('mm');
    let s = time.format('ss');
    if (s.startsWith("0")) { s = s.slice(-1) }
    if (m.startsWith("0")) { m = m.slice(-1) }

    setHourClass(`arrow-${Number(h) * 5}`);
    setMinuteClass(`arrow-${m}`);
    setSecondsClass(`arrow-${s}`);
    setUpdated(s);
    console.log(h, m, s);
  }

  useEffect(getTime, []);

  useEffect(() => {
    const timeout = setTimeout(getTime, 1000);
    return () => {
      clearTimeout(timeout);
    }
  }, [updated]);
  
  return (
    <div className="watch">
      <div className="watch-name">{town}</div>
      <div className="watch-draw">
        <div className="clock">
          <span className={`hour ${hourClass}`}></span>
          <span className={`minute ${minuteClass}`}></span>
          <span className={`seconds ${secondsClass}`}></span>
        </div>
        <div className="material-icons" onClick={() => remove(town)}>close</div>
      </div>  
    </div>
  )
}
