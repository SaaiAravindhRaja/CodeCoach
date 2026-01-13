import httpx
import os
from typing import Dict, Any, Optional

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "")


async def transcribe_audio(file_path: str, api_key: Optional[str] = None) -> Dict[str, Any]:
    """
    Transcribe audio using ElevenLabs Speech-to-Text API.
    Falls back to mock transcription if API key is not set.

    Args:
        file_path: Path to the audio file
        api_key: Optional user-provided API key (takes precedence over env var)
    """
    # Use provided key or fall back to environment variable
    effective_key = api_key or ELEVENLABS_API_KEY

    if not effective_key or effective_key == "your_elevenlabs_api_key_here":
        # Mock transcription for development/demo
        return {
            "text": "[Transcription will appear here when ElevenLabs API key is configured. "
                   "For now, using placeholder text.]\n\n"
                   "So for this problem, I'm thinking we can use a hash map approach. "
                   "First, I'll iterate through the array and for each element, check if "
                   "the complement exists in our map. The complement would be target minus "
                   "the current number. If it exists, we found our pair. If not, we add the "
                   "current number to the map. This gives us O(n) time complexity since we "
                   "only pass through the array once, and O(n) space for the hash map.",
            "duration": 45.0
        }

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            with open(file_path, "rb") as audio_file:
                files = {"file": (file_path.split("/")[-1], audio_file, "audio/webm")}
                headers = {"xi-api-key": effective_key}

                response = await client.post(
                    "https://api.elevenlabs.io/v1/speech-to-text",
                    headers=headers,
                    files=files
                )

                if response.status_code == 200:
                    data = response.json()
                    return {
                        "text": data.get("text", ""),
                        "duration": data.get("duration", 0)
                    }
                else:
                    # Fallback on API error
                    return {
                        "text": f"[Transcription failed: {response.status_code}. Using recorded audio for evaluation.]",
                        "duration": 0
                    }
    except Exception as e:
        return {
            "text": f"[Transcription error: {str(e)}. Please check your API configuration.]",
            "duration": 0
        }
