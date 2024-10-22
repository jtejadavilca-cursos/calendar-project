const now = new Date();

export default [
    /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
    {
        id: 1,
        title: "Long Event",
        user: {
            _id: "123",
            name: "José",
        },
        notes: "This is a really long event",
        start: new Date(2024, 9, 22, 2, 0, 0),
        end: new Date(2024, 9, 22, 3, 0, 0),
        bgColor: "#fafafa",
    },

    {
        id: 2,
        title: "DTS STARTS",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: "DTS ENDS",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: "Some Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 9, 0, 0, 0),
        allDay: true,
    },

    {
        id: 92,
        title: "Some Other Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 9, 8, 0, 0),
        end: new Date(2015, 3, 10, 11, 30, 0),
    },
    {
        id: 5,
        title: "Conference",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: "Big conference for important people",
    },
    {
        id: 6,
        title: "Meeting",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
        id: 7,
        title: "Lunch",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: "Power lunch",
    },
    {
        id: 8,
        title: "Meeting",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: "Happy Hour",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: "Most important meal of the day",
    },
    {
        id: 10,
        title: "Dinner",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: "Planning Meeting with Paige",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 13, 8, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 11.1,
        title: "Inconvenient Conference Call",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 13, 9, 30, 0),
        end: new Date(2015, 3, 13, 12, 0, 0),
    },
    {
        id: 11.2,
        title: "Project Kickoff - Lou's Shoes",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 13, 11, 30, 0),
        end: new Date(2015, 3, 13, 14, 0, 0),
    },
    {
        id: 11.3,
        title: "Quote Follow-up - Tea by Tina",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 13, 15, 30, 0),
        end: new Date(2015, 3, 13, 16, 0, 0),
    },
    {
        id: 12,
        title: "Late Night Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: "Late Same Night Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: "Multi-day Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: "Today",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: "Point in Time Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: now,
        end: now,
    },
    {
        id: 16,
        title: "Video Record",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 15, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 17,
        title: "Dutch Song Producing",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
        id: 18,
        title: "Itaewon Meeting",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 16, 30, 0),
        end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
        id: 19,
        title: "Online Coding Test",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
        id: 20,
        title: "An overlapped Event",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 21,
        title: "Phone Interview",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 17, 0, 0),
        end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
        id: 22,
        title: "Cooking Class",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 17, 30, 0),
        end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
        id: 23,
        title: "Go to the gym",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2015, 3, 14, 18, 30, 0),
        end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
        id: 24,
        title: "DST ends on this day (Europe)",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2022, 9, 30, 0, 0, 0),
        end: new Date(2022, 9, 30, 4, 30, 0),
    },
    {
        id: 25,
        title: "DST ends on this day (America)",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2022, 10, 6, 0, 0, 0),
        end: new Date(2022, 10, 6, 4, 30, 0),
    },
    {
        id: 26,
        title: "DST starts on this day (America)",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2023, 2, 12, 0, 0, 0),
        end: new Date(2023, 2, 12, 4, 30, 0),
    },
    {
        id: 27,
        title: "DST starts on this day (Europe)",
        user: {
            _id: "123",
            name: "José",
        },
        start: new Date(2024, 9, 26, 0, 0, 0),
        end: new Date(2024, 9, 26, 4, 30, 0),
    },
];
