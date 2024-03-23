export const makeData = (number) => {
    const data = []
    for (let i = 0; i < number; i++) {
        data.push(
            {
                firstName: `prince ${i + 1}`,
                lastName: `Hansen ${i + 1}`,
                age: 20 + i,
                visits: 27 + i,
                progress: 50 + i,
                status: "single",
                subRows: undefined
            })
    }
    return data;
}
