import React, { useState, useEffect } from "react";
import "./styles.scss";
import HpBar from "../HpBar";
import HitDamage from "../HitDamage";

//32 13
const KEY_SPACE = 32;
const KEY_ENTER = 13;

const INIT_HP = 500;

const GameScreen = () => {
  const [hp, setHp] = useState(INIT_HP);
  const [maxHp, setMaxHp] = useState(INIT_HP);
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
  }, [hp]);

  useEffect(() => {
    setHp(hp - hitDamage);
  }, [hitDamage]);

  useEffect(() => {
    if (hp < 0) {
      const newBossSize = Math.floor(Math.random() * 600 + 100);
      setHp(newBossSize);
      setMaxHp(newBossSize);
    }
  }, [hp]);

  const bossStyle = {
    width: hp,
    height: hp,
    borderRadius: hp / 2,
  };

  return (
    <div className="game-screen">
      <div className="game-monitor">
        <HitDamage p1X={100} p1Y={100} p2X={500} p2Y={500} />
        <div className="boss" style={bossStyle}>
          {hitDamage > 0 && hitDamage}
        </div>
      </div>
      <div className="guideLine">
        <HpBar width={300} hp={hp} maxHp={maxHp} />
      </div>
    </div>
  );
};

export default GameScreen;
