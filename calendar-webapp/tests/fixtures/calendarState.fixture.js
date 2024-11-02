export const calendarFixture = {
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    mockedEvents: [
        {
            id: "1",
            title: "Birthday Ana",
            start: 1730600000000,
            end: 1730608000000,
            notes: "Buy a cake",
            user: {
                _id: "123",
                name: "John Doe",
            },
        },
        {
            id: "2",
            title: "Birthday Maria",
            start: 1731600000000,
            end: 1730617000000,
            notes: "Buy a gift",
            user: {
                _id: "123",
                name: "John Doe",
            },
        },
    ],
    mockedNewEvents: [
        {
            id: "1",
            title: "Birthday Ana",
            start: 1730600000000,
            end: 1730608000000,
            notes: "Buy a cake",
            user: {
                _id: "123",
                name: "John Doe",
            },
        },
        {
            id: "3",
            title: "Work presentation",
            start: 1730620000000,
            end: 1730608400000,
            notes: "Go to the office",
            user: {
                _id: "123",
                name: "John Doe",
            },
        },
    ],
};
