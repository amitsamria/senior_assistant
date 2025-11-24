import { useState, useEffect } from 'react';
import api from '../services/api';

const MemoryGame = ({ onGameComplete }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            checkForMatch(newFlipped);
        }
    };

    const checkForMatch = ([first, second]) => {
        const firstCard = cards.find(c => c.id === first);
        const secondCard = cards.find(c => c.id === second);

        if (firstCard.emoji === secondCard.emoji) {
            setSolved([...solved, first, second]);
            setFlipped([]);
            if (solved.length + 2 === cards.length) {
                setGameWon(true);
                submitScore(moves + 1);
            }
        } else {
            setTimeout(() => setFlipped([]), 1000);
        }
    };

    const submitScore = async (finalMoves) => {
        try {
            const score = Math.max(0, 100 - (finalMoves * 5)); // Simple scoring logic
            await api.post('/scores', {
                id: 0,
                date: new Date().toISOString().split('T')[0],
                score: score,
                total_attempts: finalMoves,
                game_type: 'memory'
            });
            if (onGameComplete) onGameComplete();
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    return (
        <div className="text-center">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary">Memory Game</h3>
                <div className="text-xl font-semibold text-secondary">Moves: {moves}</div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`aspect-square rounded-xl flex items-center justify-center text-4xl cursor-pointer transition-all transform ${flipped.includes(card.id) || solved.includes(card.id)
                            ? 'bg-white border-2 border-primary rotate-0'
                            : 'bg-primary text-transparent rotate-180'
                            } shadow-md hover:shadow-lg`}
                    >
                        {(flipped.includes(card.id) || solved.includes(card.id)) ? card.emoji : '?'}
                    </div>
                ))}
            </div>

            {gameWon && (
                <div className="mt-4 p-4 bg-green-100 rounded-xl animate-fade-in">
                    <h4 className="text-2xl font-bold text-green-800 mb-2">Great Job! 🎉</h4>
                    <p className="text-lg text-green-700 mb-4">You completed the game in {moves} moves.</p>
                    <button
                        onClick={initializeGame}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
