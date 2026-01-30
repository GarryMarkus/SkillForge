RULES = {
    "NO_FACE": 10,
    "MULTI_FACE": 30,
    "TAB_SWITCH": 15,
    "AUDIO": 10,
    "LOOK_AWAY": 5,
}

THRESHOLD = 50

def update_risk(session, event, confidence):
    session.risk_score += RULES.get(event, 0) * confidence
    if session.risk_score >= THRESHOLD:
        session.is_flagged = True
    session.save()
