import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  points: number;
  taps: number;
  multiplier: number;
  date: string;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

export function Leaderboard({ onClose }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://press-gitanas-anas-projects-1a6a40c2.vercel.app/api/leaderboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md border-2 border-primary">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-primary">Leaderboard</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {loading && <p className="text-gray-400">Loading leaderboard...</p>}
        {error && <p className="text-red-500">Error loading leaderboard: {error}</p>}
        {!loading && !error && leaderboardData.length === 0 && (
          <p className="text-gray-400">No scores yet. Be the first to save your score!</p>
        )}
        {!loading && !error && leaderboardData.length > 0 && (
          <div className="space-y-2">
            {leaderboardData.map((entry, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-dark rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-primary font-bold">#{index + 1}</span>
                  <span className="text-white">{entry.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-primary font-bold">{entry.points} pts</div>
                  <div className="text-sm text-gray-400">
                    {entry.taps} taps • x{entry.multiplier}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}