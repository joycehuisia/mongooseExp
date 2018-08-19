module.exports = Object.freeze({

    // ENUMS
    subjects: {
        ENGLISH: "ENGLISH",
        MATH: "MATH",
        SCIENCE: "SCIENCE"
    },
    userTypes: {
        STUDENT: "STUDENT", 
        TEACHER: "TEACHER", 
        PARENT: "PARENT", 
        ADMIN: "ADMIN", 
        SUPERUSER: "SUPERUSER"
    },
    currency: {
        HKD: "HKD",
        USD: "USD",
        CNY: "RMB",
        JPY: "JPY",
        KRW: "KRW"
    },
    questionTypes: {
        ESSAY: "ESSAY",
        MULTIPLE_CHOICE: "MULTIPLECHOICE",
        DRAWING: "DRAWING"
    },
    infoType: {
        QUESTION: "QUESTION",
        TEXT: "TEXT",
        IMAGE: "IMAGE"
    },
    materialType: {
        QUIZ: "QUIZ",
        HANDOUT: "HANDOUT"
    },
    quizTypes: {
        HOMEWORK: "HOMEWORK",
        EXERCISE: "EXERCISE",
        TEST: "TEST"
    },
    sortOptions: {
        "ID": 0,
        "DATE_CREATED": 1
    },
    sortDirection: {
        "ASC": 1,
        "DESC": -1
    }
});