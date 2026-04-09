import { useState } from 'react'
import { Upload, Link as LinkIcon, Type, FileText, Send, Loader2 } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'file' | 'url' | 'text'>('file')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setMessage('Uploading and extracting text...')
    
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setMessage(`Success! Added ${data.filename} to the queue. Claude is now ingesting it.`)
    } catch (err) {
      setMessage('Error uploading file. Check if the local backend server is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = new FormData(e.currentTarget).get('url') as string
    if (!url) return

    setLoading(true)
    setMessage('Fetching URL content...')
    
    const form = new FormData()
    form.append('url', url)

    try {
      const res = await fetch('http://localhost:8000/url', {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      setMessage(`Success! URL added to queue. Claude is ingesting.`)
    } catch (err) {
      setMessage('Error processing URL. Check if backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500 text-white mb-6 shadow-lg shadow-brand-500/30">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Team Knowledge Base
          </h1>
          <p className="text-lg text-slate-600">
            Ingest raw sources. Claude Code will maintain the wiki.
          </p>
        </header>

        <div className="glass-panel rounded-3xl p-8 shadow-2xl">
          <div className="flex gap-4 mb-8 p-1 bg-slate-100/50 rounded-xl">
            {(['file', 'url', 'text'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white text-brand-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                }`}
              >
                {tab === 'file' && <Upload size={18} />}
                {tab === 'url' && <LinkIcon size={18} />}
                {tab === 'text' && <Type size={18} />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'file' && (
              <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:bg-slate-50/50 transition-colors group">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileUpload}
                  disabled={loading}
                  accept=".pdf,.docx,.pptx,.xlsx,.md,.txt"
                />
                <div className="pointer-events-none relative z-0">
                  <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-lg font-medium text-slate-700 mb-2">
                    Click or drag file to upload
                  </p>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Supports PPTX, XLSX, DOCX, PDF, Markdown, and TXT files.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Jira or Confluence URL
                  </label>
                  <input 
                    name="url"
                    type="url" 
                    placeholder="https://your-domain.atlassian.net/wiki/spaces/..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Ingest URL
                </button>
              </form>
            )}

            {activeTab === 'text' && (
              <div className="text-center text-slate-500 py-12">
                Raw text ingestion coming soon.
              </div>
            )}
          </div>

          {(loading || message) && (
            <div className={`mt-8 p-4 rounded-xl flex items-start gap-3 ${loading ? 'bg-brand-50 text-brand-700' : 'bg-slate-50 text-slate-700'}`}>
              {loading ? (
                <Loader2 className="animate-spin text-brand-500 shrink-0 mt-0.5" size={20} />
              ) : (
                <div className="w-2 h-2 mt-2 rounded-full bg-brand-500 shrink-0" />
              )}
              <p className="text-sm font-medium leading-relaxed">{message || 'Processing your request...'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
