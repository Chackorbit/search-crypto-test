import axios from "axios";

export async function fetchCryptoPair() {
  const api = `https://api-eu.okotoki.com/coins`;

  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data:" + error); // Якщо виникає помилка, генеруємо виняток
  }
}
