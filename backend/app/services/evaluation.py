import os
import json
from typing import Dict, Any, Optional
from anthropic import Anthropic

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")

EVALUATION_PROMPT = """You are an expert technical interviewer evaluating a coding interview practice session.

PROBLEM: {problem_title}
DIFFICULTY: {difficulty}
DESCRIPTION: {problem_description}

CANDIDATE'S CODE ({language}):
```{language}
{code}
```

CANDIDATE'S VERBAL EXPLANATION (transcribed):
"{transcription}"

TIME TAKEN: {duration_minutes} minutes
HINTS USED: {hints_used}

Evaluate this interview session on these dimensions:

1. COMMUNICATION CLARITY (1-10):
   - Did they explain their approach before/while coding?
   - Did they think aloud effectively?
   - Was their explanation clear and structured?
   - Did they discuss trade-offs?

2. PROBLEM-SOLVING METHODOLOGY (1-10):
   - Did they clarify the problem or verbalize assumptions?
   - Did they discuss edge cases?
   - Did they consider multiple approaches?
   - Did they optimize their solution?

3. CODE QUALITY (1-10):
   - Is the code correct for the given problem?
   - Is it efficient (time/space complexity)?
   - Is it readable (naming, structure)?
   - Does it handle edge cases?

4. OVERALL INTERVIEW READINESS (1-10):
   - Holistic score considering all factors
   - Apply a penalty if hints were used: reduce by {hints_used} points (minimum 1)

Provide detailed, constructive feedback that helps the candidate improve.

Respond ONLY with valid JSON in this exact format:
{{
  "communication_score": <1-10>,
  "problem_solving_score": <1-10>,
  "code_quality_score": <1-10>,
  "overall_score": <1-10>,
  "feedback": "<2-3 paragraph detailed feedback>",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}}"""


async def evaluate_session(
    problem: Any,
    code: str,
    transcription: str,
    language: str = "python",
    duration_seconds: int = 0,
    hints_used: int = 0,
    api_key: Optional[str] = None
) -> Dict[str, Any]:
    """
    Evaluate a coding interview session using Claude.
    Falls back to mock evaluation if API key is not set.

    Args:
        problem: The problem being solved
        code: The candidate's code
        transcription: The transcribed verbal explanation
        language: Programming language used
        duration_seconds: Time taken in seconds
        hints_used: Number of hints used
        api_key: Optional user-provided API key (takes precedence over env var)
    """
    duration_minutes = round(duration_seconds / 60, 1) if duration_seconds else 0

    # Use provided key or fall back to environment variable
    effective_key = api_key or ANTHROPIC_API_KEY

    if not effective_key or effective_key == "your_anthropic_api_key_here":
        # Mock evaluation for development/demo
        return generate_mock_evaluation(code, transcription, hints_used)

    try:
        client = Anthropic(api_key=effective_key)

        prompt = EVALUATION_PROMPT.format(
            problem_title=problem.title,
            difficulty=problem.difficulty,
            problem_description=problem.description,
            language=language,
            code=code,
            transcription=transcription,
            duration_minutes=duration_minutes,
            hints_used=hints_used
        )

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        # Parse JSON response
        response_text = message.content[0].text
        # Try to extract JSON from the response
        try:
            result = json.loads(response_text)
        except json.JSONDecodeError:
            # Try to find JSON in the response
            start = response_text.find("{")
            end = response_text.rfind("}") + 1
            if start != -1 and end > start:
                result = json.loads(response_text[start:end])
            else:
                raise ValueError("Could not parse JSON from response")

        return result

    except Exception as e:
        # Fallback to mock on error
        print(f"Evaluation error: {e}")
        return generate_mock_evaluation(code, transcription, hints_used)


def generate_mock_evaluation(code: str, transcription: str, hints_used: int) -> Dict[str, Any]:
    """Generate a mock evaluation for development/demo purposes."""
    # Score based on code length and transcription presence
    has_code = len(code.strip()) > 50
    has_explanation = len(transcription.strip()) > 100

    base_code_score = 7 if has_code else 4
    base_comm_score = 7 if has_explanation else 3

    communication_score = min(10, max(1, base_comm_score + (1 if "approach" in transcription.lower() else 0)))
    problem_solving_score = min(10, max(1, 6 + (1 if "edge" in transcription.lower() else 0) + (1 if "complexity" in transcription.lower() else 0)))
    code_quality_score = min(10, max(1, base_code_score))

    # Apply hints penalty
    overall_base = (communication_score + problem_solving_score + code_quality_score) // 3
    overall_score = max(1, overall_base - hints_used)

    if has_explanation and has_code:
        feedback = (
            "Good effort on this problem! You demonstrated a solid understanding of the approach "
            "and communicated your thought process while coding. Your explanation showed awareness "
            "of the algorithm's logic.\n\n"
            "To improve, try to be more explicit about time and space complexity upfront. "
            "Also, consider walking through a specific example before diving into code - this "
            "helps interviewers follow your reasoning and catches edge cases early.\n\n"
            "Keep practicing! Your communication skills are developing well."
        )
        strengths = [
            "Explained approach while coding",
            "Code structure is readable",
            "Showed problem-solving initiative"
        ]
        improvements = [
            "Discuss time/space complexity more explicitly",
            "Walk through an example before coding",
            "Consider more edge cases verbally"
        ]
    elif has_code:
        feedback = (
            "Your code shows understanding of the problem, but your verbal explanation was limited. "
            "In real interviews, thinking aloud is crucial - interviewers want to understand your "
            "thought process, not just see the final code.\n\n"
            "Try to narrate what you're doing as you code: 'I'm using a hash map here because...', "
            "'This loop handles the case where...' This gives interviewers insight into your reasoning.\n\n"
            "Practice explaining your approach BEFORE writing code to build this habit."
        )
        strengths = [
            "Code demonstrates problem understanding",
            "Solution approach is reasonable"
        ]
        improvements = [
            "Explain your approach before coding",
            "Think aloud while implementing",
            "Discuss why you chose this approach over alternatives",
            "Verbalize edge cases you're handling"
        ]
    else:
        feedback = (
            "This session needs more development. A strong interview performance requires both "
            "working code AND clear communication. Start by reading the problem carefully, then "
            "explain your initial thoughts before writing any code.\n\n"
            "Try this structure: 1) Clarify the problem, 2) Discuss your approach, 3) Identify "
            "edge cases, 4) Write code while explaining, 5) Test with examples.\n\n"
            "Don't worry - interview skills improve with practice. Keep at it!"
        )
        strengths = [
            "Attempting the problem is the first step"
        ]
        improvements = [
            "Complete your code solution",
            "Practice explaining your thought process",
            "Structure your approach before coding",
            "Take time to understand the problem fully"
        ]

    return {
        "communication_score": communication_score,
        "problem_solving_score": problem_solving_score,
        "code_quality_score": code_quality_score,
        "overall_score": overall_score,
        "feedback": feedback,
        "strengths": strengths,
        "improvements": improvements
    }
