const dateWrappers = document.querySelectorAll(".rest_of_date_str");
const dayWrapper = document.querySelectorAll(".day");

type CurrDate = {
  day: string;
  formattedDate: string;
};

function getDate(): CurrDate {
  const date = new Date();
  
  // Traduzione giorni in Italiano
  const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  
  // Traduzione mesi in Italiano
  const months = [
    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
    "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  // Modifica per le 24 ore: 
  // 1. locale "it-IT"
  // 2. hour12: false
  const standardTime = date
    .toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .trim();

  // Formato finale: Giorno Mese Ora (es. 28 Gen 23:55)
  const formattedDate = ` ${dayOfMonth} ${month}  ${standardTime}`;

  return {
    day: dayOfWeek,
    formattedDate: formattedDate,
  };
}

function displayDate(formattedDate: string): void {
  dateWrappers.forEach((el) => (el.textContent = formattedDate));
}

function displayDay(day: string): void {
  dayWrapper.forEach((el) => (el.textContent = day));
}

export function runClock() {
  const dateDetails = getDate();
  displayDate(dateDetails.formattedDate);
  displayDay(dateDetails.day);
  setInterval(() => {
    const dateDetails = getDate();
    if (dateDetails.formattedDate != dateWrappers[0].textContent) {
      displayDate(dateDetails.formattedDate);
      displayDay(dateDetails.day);
    }
  }, 5000);
}

export const TESTING = { getDate };
