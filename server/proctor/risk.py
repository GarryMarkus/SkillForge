"""
Heuristic risk evaluation engine for live proctored examinations.
Accumulates violation points based on weighted suspicious activities.
"""

RULES = {
    "NO_FACE": 10,
    "MULTI_FACE": 30,
    "TAB_SWITCH": 15,
    "AUDIO": 10,
    "LOOK_AWAY": 5,
    "DISQUALIFIED": 50,
}

THRESHOLD = 50


def update_risk(session, event: str, confidence: float = 1.0) -> None:
    """
    Accumulate risk points for an exam session based on incoming proctor events.
    Automatically flags the session when risk score reaches or exceeds THRESHOLD (50).
    """
    normalized_event = event.upper().strip()
    penalty = RULES.get(normalized_event, 0)
    session.risk_score += penalty * confidence

    if session.risk_score >= THRESHOLD:
        session.is_flagged = True

    session.save()
