export const buildPositions = (rows, cols, seats) => {
    let positions = [];

    // fill with empty seats
    for (let i = 1; i <= rows * cols; i++) {
        positions.push({ id: null, position: i, status: "free" });
    }

    // update id and status if not free
    const result = positions.map((position) => {
        const notFree = seats.find(
            (seat) => seat.position === position.position
        );

        if (notFree) {
            return {
                ...position,
                id: notFree.id,
                status: notFree.status,
            };
        } else {
            return position;
        }
    });
    result.sort((a, b) => a.position - b.position);

    return result;
};
