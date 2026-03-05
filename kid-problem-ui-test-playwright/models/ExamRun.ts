export class ExamRun {
    Uid: string | null | undefined;
    ExamCategory: string | null | undefined;
    ExamTitle: string | null | undefined;
    AnsweredBy: string | null | undefined;
    StartTime: string | null | undefined;
    CompleteTime: string | null | undefined;
    TotalDuration: string | null | undefined;
    TotalCount: string | null | undefined;
    CorrectCount: string | null | undefined;
    GuessCount: string | null | undefined;
    GuessCorrectCount: string | null | undefined;
    ExamDetails: ExamRunDetail[] | null | undefined;
}

export class ExamRunDetail {
    ProblemTitle: string | null | undefined;
    UserAnswer: string | null | undefined;
    Correct: string | null | undefined;
    Guess: string | null | undefined;
    Duration: string | null | undefined;

    toString(): string {
        return `${this.ProblemTitle}${this.UserAnswer}${this.Correct}${this.Guess}${this.Duration}`;
    }
}