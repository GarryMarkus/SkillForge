from django.test import TestCase
from django.contrib.auth import get_user_model
from proctor.models import Exam, ExamSession, ProctorEvent
from proctor.risk import update_risk, RULES, THRESHOLD

User = get_user_model()


class ProctorRiskEngineTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="candidate_proctor@example.com",
            password="Password123!",
            role="student"
        )
        self.exam = Exam.objects.create(
            title="Full-Stack Technical Assessment",
            duration_minutes=60,
            is_active=True
        )
        self.session = ExamSession.objects.create(
            user=self.user,
            exam=self.exam,
            risk_score=0.0,
            is_flagged=False
        )

    def test_exam_session_creation(self):
        """Test initial exam session creation and default unflagged risk state."""
        self.assertEqual(self.session.risk_score, 0.0)
        self.assertFalse(self.session.is_flagged)
        self.assertTrue(self.session.is_active)
        self.assertEqual(self.session.user, self.user)
        self.assertEqual(self.session.exam, self.exam)

    def test_risk_accumulation_below_threshold(self):
        """Test risk points accumulate without premature flagging below threshold 50."""
        # TAB_SWITCH penalty = 15
        update_risk(self.session, "TAB_SWITCH")
        self.session.refresh_from_db()
        self.assertEqual(self.session.risk_score, 15.0)
        self.assertFalse(self.session.is_flagged)

        # MULTI_FACE penalty = 30 -> total 45
        update_risk(self.session, "MULTI_FACE")
        self.session.refresh_from_db()
        self.assertEqual(self.session.risk_score, 45.0)
        self.assertFalse(self.session.is_flagged)

    def test_risk_flags_session_at_or_above_threshold_50(self):
        """Test that reaching or exceeding 50 penalty points automatically sets is_flagged=True."""
        # Start at 45 points
        self.session.risk_score = 45.0
        self.session.save()

        # NO_FACE penalty = 10 -> total 55 >= 50
        update_risk(self.session, "NO_FACE")
        self.session.refresh_from_db()
        self.assertEqual(self.session.risk_score, 55.0)
        self.assertTrue(self.session.is_flagged)

    def test_immediate_disqualification_flagging(self):
        """Test that a DISQUALIFIED event immediately flags the session."""
        self.assertEqual(RULES["DISQUALIFIED"], 50)
        update_risk(self.session, "DISQUALIFIED")
        self.session.refresh_from_db()
        self.assertGreaterEqual(self.session.risk_score, THRESHOLD)
        self.assertTrue(self.session.is_flagged)

    def test_confidence_weighted_risk(self):
        """Test confidence scaling affects penalty points accurately."""
        # TAB_SWITCH (15) * 0.5 confidence = 7.5
        update_risk(self.session, "TAB_SWITCH", confidence=0.5)
        self.session.refresh_from_db()
        self.assertEqual(self.session.risk_score, 7.5)
        self.assertFalse(self.session.is_flagged)
