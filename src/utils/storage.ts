import type { QuizResult, ExamResult, QuizSession } from "@/data/types";

const PREFIX = "pc_v1_";

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key: string, value: unknown) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

// Viewed signals
export function getViewedSignals(): string[] {
  return getItem<string[]>("viewed_signals", []);
}

export function markSignalViewed(id: string) {
  const viewed = getViewedSignals();
  if (!viewed.includes(id)) {
    viewed.push(id);
    setItem("viewed_signals", viewed);
  }
}

// Quiz results
export function getQuizResults(): QuizResult[] {
  return getItem<QuizResult[]>("quiz_results", []);
}

export function saveQuizResult(result: QuizResult) {
  const results = getQuizResults();
  results.push(result);
  setItem("quiz_results", results);
  updateQuizStats(result);
  recordStudySession();
}

// Exam results
export function getExamResults(): ExamResult[] {
  return getItem<ExamResult[]>("exam_results", []);
}

export function saveExamResult(result: ExamResult) {
  const results = getExamResults();
  results.push(result);
  setItem("exam_results", results);
}

// Quiz session
export function getQuizSession(): QuizSession | null {
  return getItem<QuizSession | null>("quiz_session", null);
}

export function saveQuizSession(session: QuizSession) {
  setItem("quiz_session", session);
}

export function clearQuizSession() {
  localStorage.removeItem(PREFIX + "quiz_session");
}

// Active quiz progress (resume system)
export interface ActiveQuizProgress {
  category: string;
  currentQuestionIndex: number;
  answers: import("@/data/types").AnswerRecord[];
  startedAt: number;
}

export function getActiveQuizProgress(): ActiveQuizProgress | null {
  return getItem<ActiveQuizProgress | null>("active_quiz", null);
}

export function saveActiveQuizProgress(progress: ActiveQuizProgress) {
  setItem("active_quiz", progress);
}

export function clearActiveQuizProgress() {
  localStorage.removeItem(PREFIX + "active_quiz");
}

// Quiz stats
export interface QuizStats {
  totalQuizzes: number;
  bestScoreByCategory: Record<string, number>;
  averageScore: number;
}

export function getQuizStats(): QuizStats {
  return getItem<QuizStats>("quiz_stats", {
    totalQuizzes: 0,
    bestScoreByCategory: {},
    averageScore: 0,
  });
}

function updateQuizStats(result: QuizResult) {
  const stats = getQuizStats();
  const pct = Math.round((result.score / result.total) * 100);
  const cat = result.category || "random";

  stats.totalQuizzes += 1;
  stats.averageScore = Math.round(
    ((stats.averageScore * (stats.totalQuizzes - 1)) + pct) / stats.totalQuizzes
  );

  const prev = stats.bestScoreByCategory[cat] ?? 0;
  if (pct > prev) stats.bestScoreByCategory[cat] = pct;

  setItem("quiz_stats", stats);
}

// Study streak tracking
export interface StudyStreak {
  currentStreak: number;
  lastAccessDate: string; // YYYY-MM-DD
  totalSessions: number;
}

export function getStudyStreak(): StudyStreak {
  return getItem<StudyStreak>("study_streak", {
    currentStreak: 0,
    lastAccessDate: "",
    totalSessions: 0,
  });
}

export function recordStudySession() {
  const streak = getStudyStreak();
  const today = new Date().toISOString().split("T")[0];
  if (streak.lastAccessDate === today) return; // already recorded today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  streak.totalSessions += 1;
  streak.currentStreak = streak.lastAccessDate === yesterday ? streak.currentStreak + 1 : 1;
  streak.lastAccessDate = today;
  setItem("study_streak", streak);
}

// Exam session
export function getExamTimerEnabled(): boolean {
  return getItem<boolean>("exam_timer", false);
}

export function setExamTimerEnabled(v: boolean) {
  setItem("exam_timer", v);
}

// Reset all
export function resetAllProgress() {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
  keys.forEach((k) => localStorage.removeItem(k));
}

// Mistakes (incorrect answers from quizzes)
export function getMistakes(): import("@/data/types").AnswerRecord[] {
  const results = getQuizResults();
  const mistakes: import("@/data/types").AnswerRecord[] = [];
  for (const r of results) {
    for (const a of r.answers) {
      if (a.selectedIndex !== a.correctIndex) {
        mistakes.push(a);
      }
    }
  }
  // Deduplicate by signalId, keep latest
  const seen = new Map<string, import("@/data/types").AnswerRecord>();
  for (const m of mistakes) {
    seen.set(m.signalId + m.question, m);
  }
  return Array.from(seen.values());
}

// Favorite questions
export interface FavoriteQuestion {
  signalId: string;
  question: string;
  category: string;
}

export function getFavoriteQuestions(): FavoriteQuestion[] {
  return getItem<FavoriteQuestion[]>("favorite_questions", []);
}

export function toggleFavoriteQuestion(fav: FavoriteQuestion) {
  const favs = getFavoriteQuestions();
  const idx = favs.findIndex(
    (f) => f.signalId === fav.signalId && f.question === fav.question
  );
  if (idx >= 0) {
    favs.splice(idx, 1);
  } else {
    favs.push(fav);
  }
  setItem("favorite_questions", favs);
}

export function isFavoriteQuestion(signalId: string, question: string): boolean {
  return getFavoriteQuestions().some(
    (f) => f.signalId === signalId && f.question === question
  );
}

// Bookmarked lessons
export interface BookmarkedLesson {
  title: string;
  route: string;
}

export function getBookmarkedLessons(): BookmarkedLesson[] {
  return getItem<BookmarkedLesson[]>("bookmarked_lessons", []);
}

export function toggleBookmarkedLesson(lesson: BookmarkedLesson) {
  const list = getBookmarkedLessons();
  const idx = list.findIndex((l) => l.route === lesson.route);
  if (idx >= 0) {
    list.splice(idx, 1);
  } else {
    list.push(lesson);
  }
  setItem("bookmarked_lessons", list);
}

export function isLessonBookmarked(route: string): boolean {
  return getBookmarkedLessons().some((l) => l.route === route);
}
