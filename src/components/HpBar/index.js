import React, { useState } from "react";
import "./styles.scss";

const HpBar = ({ width, hp, maxHp }) => {
  const hpPer = `${((hp / maxHp) * 100).toFixed(2)}%`;

  return (
    <div className="hp-bar" style={{ width }}>
      <div className="current-hp" style={{ width: hpPer }}></div>
      <div className="hp-text">
        {hp} / {maxHp}
      </div>
    </div>
  );
};

export default HpBar;
