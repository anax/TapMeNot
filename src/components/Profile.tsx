interface ProfileProps {
  playerName: string;
  points: number;
  totalTaps: number;
  multiplier: number;
  onNameChange: (name: string) => void;
  onClose: () => void;
  telegramUser?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  };
}

export function Profile({ 
  playerName, 
  points, 
  totalTaps, 
  multiplier, 
  onNameChange, 
  onClose, 
  telegramUser
}: ProfileProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-dark-lighter rounded-lg p-6 w-full max-w-md border-2 border-primary">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {telegramUser?.photo_url ? (
              <img
                src={telegramUser.photo_url}
                alt="Telegram Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {playerName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              {telegramUser?.first_name ? (
                <div className="text-lg font-bold text-primary">
                  {telegramUser.first_name} {telegramUser.last_name || ''}
                  {telegramUser.username && (
                    <span className="text-gray-400 text-sm ml-2">@{telegramUser.username}</span>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => onNameChange(e.target.value)}
                  className="w-full bg-dark border-2 border-primary rounded px-3 py-2 text-white focus:outline-none focus:border-primary-dark"
                  placeholder="Enter your name"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-dark rounded-lg p-4">
              <div className="text-gray-400 text-sm">Total Points</div>
              <div className="text-2xl font-bold text-primary">{points}</div>
            </div>
            <div className="bg-dark rounded-lg p-4">
              <div className="text-gray-400 text-sm">Total Taps</div>
              <div className="text-2xl font-bold text-primary">{totalTaps}</div>
            </div>
            <div className="bg-dark rounded-lg p-4">
              <div className="text-gray-400 text-sm">Current Multiplier</div>
              <div className="text-2xl font-bold text-primary">x{multiplier}</div>
            </div>
            <div className="bg-dark rounded-lg p-4">
              <div className="text-gray-400 text-sm">Points per Tap</div>
              <div className="text-2xl font-bold text-primary">{multiplier}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-gray-400 text-sm mb-2">Progress to Next Multiplier</div>
            <div className="h-2 bg-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300"
                style={{ width: `${(points / (50 * multiplier)) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              {points} / {50 * multiplier} points
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 