import { DEFAULT_GOAL } from '../constants'

export default function StampCard({ stamps, goal = DEFAULT_GOAL, onShowCelebration }) {
  const filled = stamps.length
  const slots = Array.from({ length: goal }, (_, i) => stamps[i] || null)
  const percentage = Math.min((filled / goal) * 100, 100)
  const isLarge = goal > 10
  const isComplete = filled >= goal

  return (
    <div className="bg-rage-card rounded-3xl p-6 border-2 border-rage-border"
         style={{ boxShadow: '0 0 20px rgba(139,0,0,0.3)' }}>

      {/* 卡片標題 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-rage-muted font-bold tracking-widest uppercase">☠ Resignation Card ☠</p>
          <p className="text-rage-accent font-black text-lg mt-0.5">忍耐是有極限的</p>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && (
            <button
              onClick={onShowCelebration}
              className="px-2 py-1 rounded-xl text-xs font-black animate-celebrate"
              style={{ background: 'linear-gradient(135deg, #8B0000, #CC0000)', color: 'white', boxShadow: '0 0 10px rgba(255,51,51,0.5)' }}
            >
              🔥 蓋滿！
            </button>
          )}
          <div className="text-right">
            <span className="text-3xl font-black text-rage-accent"
                  style={{ textShadow: '0 0 10px rgba(255,51,51,0.5)' }}>{filled}</span>
            <span className="text-gray-500 text-sm">/{goal}</span>
          </div>
        </div>
      </div>

      {/* 集點格子 */}
      <div className={`grid gap-2 mb-4 ${getGridCols(goal)}`}>
        {slots.map((stamp, i) => (
          <div
            key={i}
            className={`
              rounded-xl flex flex-col items-center justify-center
              border-2 transition-all duration-200
              ${isLarge ? 'p-1.5 min-h-[56px]' : 'p-2 min-h-[68px]'}
              ${stamp
                ? 'border-rage-border bg-rage-filled animate-stamp'
                : 'border-dashed border-rage-filled bg-rage-slot'
              }
            `}
            style={stamp ? { boxShadow: '0 0 8px rgba(139,0,0,0.4)' } : {}}
            title={stamp ? `${stamp.label}${stamp.description ? '：' + stamp.description : ''}` : ''}
          >
            {stamp ? (
              <>
                <span
                  className={`select-none ${isLarge ? 'text-xl' : 'text-2xl'}`}
                  style={{
                    transform: `rotate(${getRotation(i)}deg)`,
                    filter: 'drop-shadow(0 0 4px rgba(255,80,80,0.5))',
                  }}
                >
                  {stamp.emoji}
                </span>
                <span className="text-rage-muted mt-0.5 leading-none" style={{ fontSize: '9px' }}>
                  {formatShortDate(stamp.createdAt)}
                </span>
              </>
            ) : (
              <span className="text-gray-700 text-xs font-bold">{i + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* 進度條 */}
      <div className="mt-2">
        <div className="h-2 bg-rage-slot rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${percentage}%`,
              background: 'linear-gradient(to right, #8B0000, #FF3333)',
              boxShadow: '0 0 8px rgba(255,51,51,0.5)',
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 text-right">
          {filled >= goal
            ? '🔥 集滿！是時候了！'
            : <span>再 <span className="text-rage-accent font-bold">{goal - filled}</span> 點就提離職！</span>
          }
        </p>
      </div>
    </div>
  )
}

function getGridCols(goal) {
  if (goal <= 6) return 'grid-cols-3'
  if (goal <= 10) return 'grid-cols-5'
  if (goal <= 20) return 'grid-cols-5'
  return 'grid-cols-6'
}

function formatShortDate(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function getRotation(index) {
  const rotations = [-8, 5, -3, 7, -6, 4, -5, 8, -7, 3, -4, 6, -8, 5, -3]
  return rotations[index % rotations.length]
}
