import React, { useState } from 'react';
import './styles.scss'

const GameScreen = () => {
    const [bossSize, setBossSize] = useState(500);

    const bossStyle = {
        width: bossSize,
        height: bossSize,
        borderRadius: bossSize / 2
    };
    
    return (
        <div className='game-screen'>
            <div className='game-monitor'>
                <div className='boss' style={bossStyle}>

                </div>
            </div>
            <div className='guideLine'>
                ^^
            </div>
        </div>
    );
};

export default GameScreen;