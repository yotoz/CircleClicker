import React, { useState, useEffect } from "react";
import "./styles.scss";

//32 13
const KEY_SPACE = 32;
const KEY_ENTER = 13;

const INIT_HP = 500;

const GameScreen = () => {
  const [bossSize, setBossSize] = useState(INIT_HP);
  const [bossHp, setBossHp] = useState(INIT_HP);

  useEffect(() => {
    const keyupHandler = (e) => {
      switch (e.keyCode) {
        case KEY_SPACE:
        case KEY_ENTER:
          setBossSize(bossSize - 5);
      }
    };

    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [bossSize]);

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

  const currentHpPer = `${(bossSize / bossHp) * 100}%`;

  return (
    <div className="game-screen">
      <div className="game-monitor">
        <div className="boss" style={bossStyle}></div>
      </div>
      <div className="guideLine">
        <div className="hp-bar">
          <div className="current-hp" style={{ width: currentHpPer }}></div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
