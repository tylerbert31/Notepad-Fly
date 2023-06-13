function getDate() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-indexed
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export default getDate;
