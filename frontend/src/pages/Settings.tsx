import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Key, Eye, EyeOff, Check, Trash2, ExternalLink, AlertTriangle, Shield } from 'lucide-react';
import { apiKeyService } from '../services/apiKeys';

export function Settings() {
  const [anthropicKey, setAnthropicKey] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [showAnthropicKey, setShowAnthropicKey] = useState(false);
  const [showElevenLabsKey, setShowElevenLabsKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasExistingKeys, setHasExistingKeys] = useState({
    anthropic: false,
    elevenLabs: false,
  });

  useEffect(() => {
    // Check for existing keys on load
    setHasExistingKeys({
      anthropic: apiKeyService.hasAnthropicKey(),
      elevenLabs: apiKeyService.hasElevenLabsKey(),
    });

    // Load existing keys (masked)
    const existingAnthropicKey = apiKeyService.getAnthropicKey();
    const existingElevenLabsKey = apiKeyService.getElevenLabsKey();
    if (existingAnthropicKey) setAnthropicKey(existingAnthropicKey);
    if (existingElevenLabsKey) setElevenLabsKey(existingElevenLabsKey);
  }, []);

  const handleSave = () => {
    if (anthropicKey.trim()) {
      apiKeyService.setAnthropicKey(anthropicKey.trim());
    }
    if (elevenLabsKey.trim()) {
      apiKeyService.setElevenLabsKey(elevenLabsKey.trim());
    }
    setHasExistingKeys({
      anthropic: apiKeyService.hasAnthropicKey(),
      elevenLabs: apiKeyService.hasElevenLabsKey(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    apiKeyService.clearKeys();
    setAnthropicKey('');
    setElevenLabsKey('');
    setHasExistingKeys({
      anthropic: false,
      elevenLabs: false,
    });
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '•'.repeat(key.length);
    return key.substring(0, 4) + '•'.repeat(key.length - 8) + key.substring(key.length - 4);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyber/10 border border-cyber/30 rounded-lg flex items-center justify-center">
              <SettingsIcon className="text-cyber" size={20} />
            </div>
            <div>
              <span className="text-cyber font-mono text-xs tracking-widest">CONFIGURATION</span>
              <h1 className="font-display text-title text-white">
                SETTINGS
              </h1>
            </div>
          </div>
          <p className="text-muted max-w-lg">
            Configure your API keys to enable AI-powered code evaluation and voice transcription.
          </p>
        </motion.div>

        {/* API Keys Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Info Box */}
          <div className="card-cyber p-4">
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-cyber shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono text-sm text-cyber mb-1 tracking-wider">BRING YOUR OWN KEYS</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Your API keys are stored locally in your browser and sent directly to the AI services.
                  They are never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Anthropic API Key */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon/10 border border-neon/30 rounded-lg flex items-center justify-center">
                  <Key size={14} className="text-neon" />
                </div>
                <div>
                  <h3 className="font-mono text-sm text-white tracking-wider">ANTHROPIC API KEY</h3>
                  <p className="text-xs text-muted">Required for AI code evaluation</p>
                </div>
              </div>
              {hasExistingKeys.anthropic && (
                <span className="flex items-center gap-1 text-xs font-mono text-neon">
                  <Check size={12} />
                  CONFIGURED
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type={showAnthropicKey ? 'text' : 'password'}
                value={showAnthropicKey ? anthropicKey : (anthropicKey ? maskKey(anthropicKey) : '')}
                onChange={(e) => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-..."
                className="w-full bg-surface-300/50 border border-surface-100 rounded-lg px-4 py-3 pr-12 font-mono text-sm text-white placeholder:text-muted focus:border-cyber/50 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowAnthropicKey(!showAnthropicKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showAnthropicKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-cyber hover:underline"
            >
              Get your API key
              <ExternalLink size={12} />
            </a>
          </div>

          {/* ElevenLabs API Key */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-heat/10 border border-heat/30 rounded-lg flex items-center justify-center">
                  <Key size={14} className="text-heat" />
                </div>
                <div>
                  <h3 className="font-mono text-sm text-white tracking-wider">ELEVENLABS API KEY</h3>
                  <p className="text-xs text-muted">Required for voice transcription</p>
                </div>
              </div>
              {hasExistingKeys.elevenLabs && (
                <span className="flex items-center gap-1 text-xs font-mono text-neon">
                  <Check size={12} />
                  CONFIGURED
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type={showElevenLabsKey ? 'text' : 'password'}
                value={showElevenLabsKey ? elevenLabsKey : (elevenLabsKey ? maskKey(elevenLabsKey) : '')}
                onChange={(e) => setElevenLabsKey(e.target.value)}
                placeholder="xi-..."
                className="w-full bg-surface-300/50 border border-surface-100 rounded-lg px-4 py-3 pr-12 font-mono text-sm text-white placeholder:text-muted focus:border-cyber/50 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowElevenLabsKey(!showElevenLabsKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              >
                {showElevenLabsKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <a
              href="https://elevenlabs.io/app/settings/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-cyber hover:underline"
            >
              Get your API key
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Warning Box */}
          {(!hasExistingKeys.anthropic || !hasExistingKeys.elevenLabs) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-heat/10 border border-heat/30 flex items-start gap-3"
            >
              <AlertTriangle size={18} className="text-heat shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-heat font-mono">
                  {!hasExistingKeys.anthropic && !hasExistingKeys.elevenLabs
                    ? 'Both API keys are required for full functionality.'
                    : !hasExistingKeys.anthropic
                    ? 'Anthropic API key is required for AI code evaluation.'
                    : 'ElevenLabs API key is required for voice transcription.'}
                </p>
                <p className="text-xs text-muted mt-1">
                  Without keys, the app will use mock responses for demonstration purposes.
                </p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              className="btn-primary flex-1"
            >
              {saved ? (
                <>
                  <Check size={14} />
                  SAVED
                </>
              ) : (
                <>
                  <Key size={14} />
                  SAVE KEYS
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-surface-300/50 border border-surface-100 rounded-lg font-mono text-xs text-muted hover:text-danger hover:border-danger/50 transition-all flex items-center gap-2"
            >
              <Trash2 size={14} />
              CLEAR
            </button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-surface-100/30"
        >
          <div className="card p-6">
            <h3 className="font-mono text-sm text-cyber mb-4 tracking-wider">HOW IT WORKS</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-cyber">1.</span>
                <span>Get your API keys from Anthropic and ElevenLabs (free tiers available)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber">2.</span>
                <span>Paste them above and click Save Keys</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber">3.</span>
                <span>Start practicing! Your voice recordings will be transcribed and your code will be evaluated by Claude AI</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
