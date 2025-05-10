import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { Leaderboard } from './components/Leaderboard'
import { Profile } from './components/Profile'
import { BottomMenu } from './components/BottomMenu'

interface LeaderboardEntry {
  name: string;
  points: number;
  taps: number;
  multiplier: number;
  date: string;
}

interface TelegramUserId {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

function App() {


  
  const [points, setPoints] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  const [lastTapTime, setLastTapTime] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [totalTaps, setTotalTaps] = useState(0)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState('Player')
  const [telegramUserId, setTelegramUserId] = useState<TelegramUserId>({})

  useEffect(() => {
    // Initialize WebApp
    WebApp.ready()
    WebApp.expand()
    
    // Load Telegram user info
    const tgUser = WebApp.initDataUnsafe?.user
    if (tgUser) {
      setPlayerName(tgUser.first_name || 'Player')
      setTelegramUserId({
        id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
      })
    }

    // Load leaderboard from localStorage
    const savedLeaderboard = localStorage.getItem('tapMeNotLeaderboard')
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard))
    }

    // Load player name from localStorage (if not using Telegram)
    const savedName = localStorage.getItem('tapMeNotPlayerName')
    if (savedName && !tgUser) {
      setPlayerName(savedName)
    }
  }, [])

  const handleTap = () => {
    const currentTime = Date.now()
    if (currentTime - lastTapTime < 100) return // Prevent spam tapping
    
    setLastTapTime(currentTime)
    setPoints(prev => prev + multiplier)
    setTotalTaps(prev => prev + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
  }

  // const saveScore = async () => {
  //   const telegramUserId = WebApp.initDataUnsafe?.user?.id;

  //   if (!telegramUserId) {
  //     WebApp.showAlert('Error: Could not identify your Telegram user ID.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch('https://press-gitanas-anas-projects-1a6a40c2.vercel.app/api/points', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${WebApp.initData}`
  //       },
  //       body: JSON.stringify({
  //         telegramUserId,
  //         points,
  //         taps: totalTaps,
  //         multiplier,
  //         playerName,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       WebApp.showAlert('Score saved to the server!');
  //       // Optionally update local state with the server's response if needed
  //       // For example, if the server returns the updated user data:
  //       // setPoints(data.data.points);
  //       // setTotalTaps(data.data.taps);
  //       // setMultiplier(data.data.multiplier);
  //       // setPlayerName(data.data.playerName);
  //     } else {
  //       WebApp.showAlert(`Error saving score: ${data.error || 'Something went wrong.'}`);
  //       console.error('Error saving score:', data);
  //     }
  //   } catch (error) {
  //     WebApp.showAlert('Failed to connect to the server. Please try again later.');
  //     console.error('Error sending score to backend:', error);
  //   }
  // }

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('https://press-five.vercel.app/api/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WebApp.initData}` // For authentication
        },
        body: JSON.stringify({
          telegramUserId: telegramUserId,
          points: points,
          taps: totalTaps,
          multiplier: multiplier,
          playerName: WebApp.initDataUnsafe.user?.first_name || 'Player'
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      WebApp.showAlert(`Sucess: ${data}`);
      
    } catch (error) {
      console.error('Full fetch error:', error);
      WebApp.showAlert(`Error: ${error}`);
    }
  };

  const handleNameChange = (newName: string) => {
    setPlayerName(newName)
    localStorage.setItem('tapMeNotPlayerName', newName)
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col  items-center justify-center pb-24">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-primary drop-shadow-[0_0_10px_rgba(0,255,136,0.5)] text-center">
          TapMeNot
        </h1>
        <div className="mb-8 space-y-2 w-full flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white">Points: {points}</h2>
          <p className="text-xl text-primary">Multiplier: x{multiplier}</p>
          <p className="text-lg text-gray-400">Total Taps: {totalTaps}</p>
        </div>
        <div
          className={`w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center cursor-pointer select-none shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-transform duration-100 active:scale-95 ${isAnimating ? 'animate-pulse-custom' : ''}`}
          onClick={handleTap}
        >
          <span className="text-2xl font-bold text-white">Tap Me!</span>
        </div>
        <div className="mt-8 w-full max-w-xs flex flex-col items-center">
          <button
            className={`w-full py-4 px-8 rounded-lg text-lg font-medium transition-all duration-300
              ${points >= 50 * multiplier
                ? 'bg-gradient-to-br from-dark-lighter to-dark border-2 border-primary text-primary hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark hover:text-white'
                : 'bg-gradient-to-br from-dark-lighter to-dark border-2 border-gray-600 text-gray-600 opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              if (points >= 50 * multiplier) {
                setPoints(prev => prev - 50 * multiplier)
                setMultiplier(prev => prev + 1)
              }
            }}
            disabled={points < 50 * multiplier}
          >
            Upgrade Multiplier (Cost: {50 * multiplier} points)
          </button>
        </div>
      </div>
      <BottomMenu
        onProfileClick={() => setShowProfile(true)}
        onLeaderboardClick={() => setShowLeaderboard(true)}
        onSaveClick={sendDataToBackend}
      />
      {showLeaderboard && (
        <Leaderboard
          leaderboard={leaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
      {showProfile && (
        <Profile
          playerName={playerName}
          points={points}
          totalTaps={totalTaps}
          multiplier={multiplier}
          onNameChange={handleNameChange}
          onClose={() => setShowProfile(false)}
          telegramUser={telegramUserId}
        />
      )}
    </div>
  )
}

export default App
