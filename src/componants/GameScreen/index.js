import React, { useState, useEffect } from "react";
import "./styles.scss";

//32 13
const KEY_SPACE = 32;
const KEY_ENTER = 13;

const INIT_HP = 500;

const GameScreen = () => {
  const [bossSize, setBossSize] = useState(INIT_HP);
  const [bossHp, setBossHp] = useState(INIT_HP);
  const [hitDamage, setHitDamage] = useState(0);

  useEffect(() => {
    const keyupHandler = (e) => {
      switch (e.keyCode) {
        case KEY_SPACE:
        case KEY_ENTER:
          const newHitDamage = Math.floor(Math.random() * 5) + 1;
          if (Math.random() < 0.5) {
            setHitDamage(newHitDamage * 5);
          } else {
            setHitDamage(newHitDamage);
          }
      }
    };

    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [bossSize]);

  useEffect(() => {
    setBossSize(bossSize - hitDamage);
  }, [hitDamage]);

  useEffect(() => {
    if (bossSize < 0) {
      const newBossSize = Math.floor(Math.random() * 600 + 100);
      setBossSize(newBossSize);
      setBossHp(newBossSize);
    }
  }, [bossSize]);

  const bossStyle = {
    width: bossSize,
    height: bossSize,
    borderRadius: bossSize / 2,
  };

  const currentHpPer = `${((bossSize / bossHp) * 100).toFixed(2)}%`;

  return (
    <div className="game-screen">
      <div className="game-monitor">
        <div className="boss" style={bossStyle}>
          {hitDamage > 0 && hitDamage}
        </div>
      </div>
      <div className="guideLine">
        <div className="hp-bar">
          <div className="current-hp" style={{ width: currentHpPer }}></div>
          <div className="hp-text">
            {bossSize} / {bossHp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
