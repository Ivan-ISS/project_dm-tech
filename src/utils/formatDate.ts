export default function formatDate(date: string): string {
    const dateToFormat = new Date(date);

    const day = dateToFormat.getDate();
    const month = dateToFormat.getMonth() + 1;
    const year = dateToFormat.getFullYear();

    const formattedDate = `${day} ${
    ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][month - 1]
  } ${year}`;

    return formattedDate;
}