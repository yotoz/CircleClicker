import React, { useState, useEffect, useRef, useReducer } from "react";
import "./styles.scss";
import HpBar from "../HpBar";
import HitDamage from "../HitDamage";
import { genRandPos } from "../../lib/calc";

//32 13
const KEY_SPACE = 32;
const KEY_ENTER = 13;

const INIT_HP = 500;

const initialBossState = {
  hp: INIT_HP,
};
const bossStateReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        hp: action.hp,
      };
    case "ATTACK":
      return {
        hp: state.hp - action.damage,
      };
    default:
      return state;
  }
};

const GameScreen = () => {
  const [bossState, bossStateDispatch] = useReducer(
    bossStateReducer,
    initialBossState
  );
  const [maxHp, setMaxHp] = useState(INIT_HP);
  const [hitDamage, setHitDamage] = useState(0);
  const [hitDamagePos, setHitDamagePos] = useState({ left: 0, top: 0 });

  const bossRef = useRef();

  useEffect(() => {
    const keyupHandler = (e) => {
      switch (e.keyCode) {
        case KEY_SPACE:
        case KEY_ENTER:
          let newHitDamage = Math.floor(Math.random() * 5) + 1;

          if (Math.random() < 0.5) {
            newHitDamage *= 5;
          }

          setHitDamage(newHitDamage);

          bossStateDispatch({
            type: "ATTACK",
            damage: newHitDamage,
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  useEffect(() => {
    if (bossState.hp < 0) {
      const newBossSize = Math.floor(Math.random() * 600 + 100);
      bossStateDispatch({
        type: "SET",
        hp: newBossSize,
      });
      setMaxHp(newBossSize);
    }
  }, [bossState]);

  useEffect(() => {
    if (!bossRef.current) {
      return;
    }

    const { x, y, width, height } = bossRef.current.getBoundingClientRect();

    setHitDamagePos(genRandPos(x, y, x + width, y + height));
  }, [bossState.hp]);

  const bossStyle = {
    width: bossState.hp,
    height: bossState.hp,
    borderRadius: bossState.hp / 2,
  };

  return (
    <div className="game-screen">
      <div className="game-monitor">
        {hitDamage > 0 && (
          <HitDamage
            damage={hitDamage}
            left={hitDamagePos.left}
            top={hitDamagePos.top}
          />
        )}
        <div className="boss" style={bossStyle} ref={bossRef} />
      </div>
      <div className="guideLine">
        <HpBar width={300} hp={bossState.hp} maxHp={maxHp} />
      </div>
    </div>
  );
};

export default GameScreen;
