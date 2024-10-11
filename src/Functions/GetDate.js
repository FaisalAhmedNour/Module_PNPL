
const GetDateByMonth = (monthEarlier) => {
    const today = new Date();
    today.setMonth(today.getMonth() - monthEarlier);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export default GetDateByMonth;