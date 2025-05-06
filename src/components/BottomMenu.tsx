interface BottomMenuProps {
  onProfileClick: () => void;
  onLeaderboardClick: () => void;
  onSaveClick: () => void;
}

export function BottomMenu({ onProfileClick, onLeaderboardClick, onSaveClick }: BottomMenuProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-lighter border-t-2 border-primary p-4">
      <div className="max-w-2xl mx-auto flex justify-center items-center gap-8">
        <button
          onClick={onProfileClick}
          className="flex flex-col items-center text-primary hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </button>

        <button
          onClick={onLeaderboardClick}
          className="flex flex-col items-center text-primary hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs mt-1">Leaderboard</span>
        </button>

        <button
          onClick={onSaveClick}
          className="flex flex-col items-center text-primary hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span className="text-xs mt-1">Save</span>
        </button>
      </div>
    </div>
  )
} 