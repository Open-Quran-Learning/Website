export const isCourseValid = (course) => course.course_name && course.course_description;

export const isLessonValid = (lesson) => lesson.title && lesson.description && (lesson.videoUrl || lesson.article);

export const isQuizValid = (quiz) =>
    quiz.length > 0 &&
    quiz.every((it) => it.questionTitle !== "") &&
    quiz.every((question) =>
        question.type === "MCQ"
            ? question.answers.length > 0 &&
            question.answers.every((it) => it.answerText !== "") &&
            question.answers.some((it) => it.isCorrect)
            : true
    );