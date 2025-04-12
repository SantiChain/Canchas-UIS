import React, { useState } from 'react';
import './Mapa.css';
import mapaImage from './mapa.png';
import Horarios from './Horarios';

function Mapa() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuContent, setMenuContent] = useState({ content: '', idCancha: '' });

    const handleButtonClick = (content, idCancha) => {
        setMenuContent({ content, idCancha });
        setMenuVisible(true);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    return (
        <div className="map-container">
            <img src={mapaImage} alt="Mapa de la universidad" className="map-img" />

            {}
            <button
                className="map-button button-1"
                style={{ top: '32.8%', left: '24.7%' }}
                onClick={() => handleButtonClick('Estadio 1ro Marzo', '6681dc5dc62742942c281c08')}
            >
                ESTADIO 1RO MARZO
            </button>

            <button
                className="map-button button-2"
                style={{ top: '85.5%', left: '27%' }}
                onClick={() => handleButtonClick('Cancha UIS Sur', '6681dc39c62742942c281c02')}
            >
                CANCHA UIS SUR
            </button>

            <button
                className="map-button button-3"
                style={{ top: '81.1%', left: '52.6%' }}
                onClick={() => handleButtonClick('Coliseo UIS', '6681dc2dc62742942c281c00')}
            >
                COLISEO UIS
            </button>

            <button
                className="map-button button-4"
                style={{ top: '29.7%', left: '48.3%' }}
                onClick={() => handleButtonClick('Multiple 2', '6681dc0ec62742942c281bfa')}
            >
                Multiple 2
            </button>

            <button
                className="map-button button-4"
                style={{ top: '21.8%', left: '54.6%' }}
                onClick={() => handleButtonClick('Multiple 3', '6681dc13c62742942c281bfc')}
            >
                Multiple 3
            </button>

            <button
                className="map-button button-5"
                style={{ top: '29.2%', left: '42%' }}
                onClick={() => handleButtonClick('Baloncesto', '6681dbb7c62742942c281bf5')}
            >
                Baloncesto
            </button>

            <button
                className="map-button button-5"
                style={{ top: '40.7%', left: '42%' }}
                onClick={() => handleButtonClick('Multiple 1', '6681dc07c62742942c281bf8')}
            >
                Multiple 1
            </button>

            <button
                className="map-button button-6"
                style={{ top: '19.1%', left: '42%' }}
                onClick={() => handleButtonClick('Voley', '6681dca0c62742942c281c0d')}
            >
                Voley
            </button>

            <button
                className="map-button button-6"
                style={{ top: '19.1%', left: '48.25%' }}
                onClick={() => handleButtonClick('Arena', '6681dca6c62742942c281c0f')}
            >
                Arena
            </button>

            <button
                className="map-button button-7"
                style={{ top: '78.8%', left: '11.7%' }}
                onClick={() => handleButtonClick('Tenis 1', '6681dc47c62742942c281c04')}
            >
                TENIS 1
            </button>

            <button
                className="map-button button-7"
                style={{ top: '92%', left: '11.7%' }}
                onClick={() => handleButtonClick('Tenis 2', '6681dc4bc62742942c281c06')}
            >
                TENIS 2
            </button>

            <button
                className="map-button button-8"
                style={{ top: '59%', left: '49%' }}
                onClick={() => handleButtonClick('Squash', '6681dc1fc62742942c281bfe')}
            >
                SQUASH
            </button>

            <button
                className="map-button custom-button"
                style={{ top: '53%', left: '69.5%' }}
                onClick={() => handleButtonClick('Diamante Softbol Beisbol', '6681dc69c62742942c281c0a')}
            >
                DIAMANTE SOFTBOL BEISBOL
            </button>

            {/* Menú desplegable de Horarios */}
            {menuVisible && (
                <Horarios cancha={menuContent.idCancha} onClose={handleCloseMenu} />
            )}
        </div>
    );
}

export default Mapa;
