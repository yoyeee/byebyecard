import { useState } from 'react'

export default function HistoryList({ stamps, onDelete }) {
  const [confirmId, setConfirmId] = useState(null)

  if (stamps.length === 0) return null

  const recent = [...stamps].reverse().slice(0, 10)

  const formatDate = (ts) => {
    if (!ts) return ''
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) return '剛才'
    if (diff < 3600) return `${Math.floor(diff / 60)} 分鐘前`
    if (diff < 86400) return `${Math.floor(diff / 3600)} 小時前`
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} 天前`
    return d.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })
  }

  const handleDelete = (id) => {
    if (confirmId === id) {
      onDelete(id)
      setConfirmId(null)
    } else {
      setConfirmId(id)
      setTimeout(() => setConfirmId(null), 2000)
    }
  }

  return (
    <div className="bg-rage-card rounded-3xl p-5 border border-rage-filled">
      <h2 className="font-black text-rage-accent mb-3 flex items-center gap-2">
        <span>💢</span> 憤怒紀錄
        <span className="text-xs font-normal text-gray-600 ml-1">點 ✕ 兩下確認刪除</span>
      </h2>
      <div className="space-y-1">
        {recent.map((stamp) => (
          <div
            key={stamp.id}
            className="flex items-start gap-3 py-2 border-b border-rage-filled last:border-0"
          >
            <span className="text-xl shrink-0 mt-0.5">{stamp.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-200">{stamp.label}</p>
              {stamp.description && (
                <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-wrap break-words">{stamp.description}</p>
              )}
            </div>
            <span className="text-xs text-gray-600 shrink-0 mt-0.5">{formatDate(stamp.createdAt)}</span>
            <button
              onClick={() => handleDelete(stamp.id)}
              className={`
                shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5
                transition-all duration-150
                ${confirmId === stamp.id
                  ? 'bg-rage-accent text-white scale-110'
                  : 'text-gray-700 hover:text-rage-accent hover:bg-rage-filled'
                }
              `}
              title={confirmId === stamp.id ? '再按一次確認刪除' : '刪除'}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
