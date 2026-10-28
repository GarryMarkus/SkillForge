# 🧠 Candidate Matching, AI Assessments & NLP

SkillForge incorporates cutting-edge **Generative AI** and **Classical Information Retrieval (NLP)** to replace subjective resume screening with objective, empirical evaluation and ranking.

---

## 1. Candidate Intake & Multi-Modal Signal Extraction

```
           ┌──────────────────────┐        ┌──────────────────────┐
           │ Candidate PDF Resume │        │ GitHub Profile URL   │
           └──────────┬───────────┘        └──────────┬───────────┘
                      │                               │
                      ▼                               ▼
           ┌──────────────────────┐        ┌──────────────────────┐
           │ PyPDF2 Stream Parser │        │ GitHub REST Scraper  │
           │ Magic Byte Validation│        │ Repos, Stars, Commits│
           └──────────┬───────────┘        └──────────┬───────────┘
                      │                               │
                      └───────────────┬───────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │ Normalized Candidate Corp │
                        │ - Verified Skills Array   │
                        │ - Experience Metadata     │
                        │ - Code Activity Metrics   │
                        └───────────────────────────┘
```

### Resume Extraction (`PyPDF2`)
- **Sanitization:** Validates binary headers (`%PDF-1.x`) and checks file sizes (< 5MB) before processing.
- **Text Extraction:** Ingests document pages sequentially, cleaning non-ASCII artifacts and formatting raw text into an unstructured candidate corpus.
- **Skill Extraction:** Uses taxonomy dictionaries and LLM prompt schemas to normalize variations (e.g. "ReactJS", "React.js", "React" $\to$ `React`).

### GitHub Repository Analytics
- Queries GitHub public endpoints to calculate commit consistency, language distribution, open-source repositories, and star counts.
- Flags inactive or newly minted clone accounts, rewarding authentic developer track records.

---

## 2. Dynamic Assessment Generation (Google Gemini 2.5 Flash)

Rather than maintaining a static bank of leaked questions, SkillForge generates fresh, tailored assessments on demand using **LangChain** and **Google Gemini 2.5 Flash**.

### LangChain Orchestration
- **Model:** `gemini-2.5-flash` via `langchain-google-genai`.
- **System Instructions:** Configured with strict engineering rubrics, forbidding generic trivia and requiring realistic debugging, architecture, and code analysis problems.
- **Output Parsing:** Enforces structured JSON output schema using Pydantic parsers:
  ```json
  {
    "title": "Full Stack React & Django Assessment",
    "difficulty": "Mid-Senior",
    "duration_minutes": 30,
    "questions": [
      {
        "id": 1,
        "type": "mcq",
        "question": "What happens when state updates occur within useEffect without dependency declarations?",
        "options": ["Infinite re-render loop", "Silent omission", "Compile error", "Automatic memoization"],
        "correct_answer": 0,
        "explanation": "Omitting state dependencies while updating said state causes recursive effect executions."
      }
    ]
  }
  ```

### Prompt Injection Hardening
- Untrusted user input (candidate skills, resume snippets) is wrapped inside rigid XML boundary tags (`<untrusted_input>...</untrusted_input>`).
- Instructions explicitly forbid following commands embedded within candidate resumes or profile descriptions.

---

## 3. Recruiter Matching Engine: TF-IDF & Cosine Similarity

When recruiters post engineering requisitions, candidate profiles are compared against job specifications using **Term Frequency-Inverse Document Frequency (TF-IDF)** and **Cosine Similarity** from `scikit-learn`.

### Mathematical Formulation

1. **Term Frequency (TF):**
   $$\text{TF}(t, d) = \frac{f_{t, d}}{\sum_{t' \in d} f_{t', d}}$$

2. **Inverse Document Frequency (IDF):**
   $$\text{IDF}(t, D) = \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1$$

3. **Vector Space Cosine Similarity:**
   Given the normalized job vector $\mathbf{J}$ and candidate vector $\mathbf{C}$:
   $$\text{Similarity}(\mathbf{J}, \mathbf{C}) = \frac{\mathbf{J} \cdot \mathbf{C}}{\|\mathbf{J}\|_2 \|\mathbf{C}\|_2} = \frac{\sum_{i=1}^n J_i C_i}{\sqrt{\sum_{i=1}^n J_i^2} \sqrt{\sum_{i=1}^n C_i^2}}$$

### Composite Match Scoring Algorithm
To prevent keyword stuffing from defeating the ranking algorithm, SkillForge combines TF-IDF vector relevance with verified assessment performance:

$$\text{Final Score} = (0.50 \times \text{VectorSimilarity}) + (0.35 \times \text{AssessmentScore}) + (0.15 \times \text{ExperienceScore})$$

Candidates who have verified their skills through proctored evaluations always outrank candidates who only list buzzwords on their resumes.

---

## 4. Adaptive AI Upskilling Generator

When an assessment finishes, the platform analyzes incorrect responses and knowledge deficits:
1. Gaps are categorized (e.g. "Asynchronous state management", "Django ORM query performance").
2. Celery dispatches a prompt to Gemini requesting a personalized mini-course.
3. The generated markdown module contains:
   - **Root Concept Explanation:** Deep dive into the mechanics.
   - **Common Anti-Patterns:** Code snippets illustrating what NOT to do.
   - **Correct Reference Implementation:** Step-by-step verified code.
   - **Interactive Self-Quiz:** Follow-up questions to test comprehension.
4. Delivered directly in the candidate’s `/student/upskill` dashboard with interactive code highlighting.
