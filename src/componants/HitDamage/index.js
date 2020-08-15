import React, { useState, useEffect } from "react";
import "./styles.scss";

const HitDamage = ({ p1X, p1Y, p2X, p2Y }) => {
  const [position, setPosition] = useState([p1X, p1Y]);

  useEffect(() => {
    if (p2X > p1X) {
      const temp = p1X;
      p1X = p2X;
      p2X = temp;
    }

    if (p2Y > p1Y) {
      const temp = p1Y;
      p1Y = p2Y;
      p2Y = temp;
    }

    const mX = Math.floor((p1X + p2X) / 10);
    const mY = Math.floor((p1Y + p2Y) / 10);

    const roundX = Math.pow(10, mX);
    const roundY = Math.pow(10, mY);

    const pX = Math.floor(Math.random() * roundX) % (p1X - p2X);
    const pY = Math.floor(Math.random() * roundY) % (p1Y - p2Y);

    setPosition([p2X + pX, p2Y + pY]);

    console.log(position[0]);
    console.log(position[1]);
  }, []);

  return (
    <div
      className="hit-damage"
      style={{ left: position[0], top: position[1] }}
    ></div>
  );
};

export default HitDamage;
