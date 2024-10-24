export default [
    /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
    {
        _id: 1,
        title: "Long Event",
        user: {
            _id: "123",
            name: "José",
        },
        notes: "This is a really long event",
        start: new Date(2024, 9, 22, 2, 0, 0).getTime(),
        end: new Date(2024, 9, 22, 3, 0, 0).getTime(),
        bgColor: "#fafafa",
    },
    {
        _id: 2,
        title: "DST starts on this day (Europe)",
        user: {
            _id: "123",
            name: "José",
        },
        notes: "More notes...",
        start: new Date(2024, 9, 26, 0, 0, 0).getTime(),
        end: new Date(2024, 9, 26, 4, 30, 0).getTime(),
    },
];
