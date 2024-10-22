export const CalendarEvent = ({ event, title, localizer }) => {
    const { user, start, end } = event;
    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    );
};
