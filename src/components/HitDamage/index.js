import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

const HitDamage = ({ damage, left, top }) => {
  const hitDamageRef = useRef();

  useEffect(() => {
    if (!hitDamageRef.current) return;

    hitDamageRef.current.animate(
      [
        {
          fontSize: "28px",
        },
        {
          fontSize: "100px",
        },
        {
          fontSize: "28px",
        },
      ],
      {
        duration: 250,
      }
    );
  }, [damage, left, top]);

  return (
    <div className="hit-damage" style={{ left, top }} ref={hitDamageRef}>
      {damage}
    </div>
  );
};

export default HitDamage;
