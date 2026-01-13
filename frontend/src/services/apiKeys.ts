const ANTHROPIC_KEY = 'codecoach_anthropic_key';
const ELEVENLABS_KEY = 'codecoach_elevenlabs_key';

export const apiKeyService = {
  getAnthropicKey: (): string | null => {
    return localStorage.getItem(ANTHROPIC_KEY);
  },

  setAnthropicKey: (key: string): void => {
    localStorage.setItem(ANTHROPIC_KEY, key);
  },

  getElevenLabsKey: (): string | null => {
    return localStorage.getItem(ELEVENLABS_KEY);
  },

  setElevenLabsKey: (key: string): void => {
    localStorage.setItem(ELEVENLABS_KEY, key);
  },

  clearKeys: (): void => {
    localStorage.removeItem(ANTHROPIC_KEY);
    localStorage.removeItem(ELEVENLABS_KEY);
  },

  hasAnthropicKey: (): boolean => {
    const key = localStorage.getItem(ANTHROPIC_KEY);
    return key !== null && key.length > 0;
  },

  hasElevenLabsKey: (): boolean => {
    const key = localStorage.getItem(ELEVENLABS_KEY);
    return key !== null && key.length > 0;
  },

  hasKeys: (): boolean => {
    return apiKeyService.hasAnthropicKey() && apiKeyService.hasElevenLabsKey();
  },
};
