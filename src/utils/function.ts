export const firebase_date_converter = (date) => {
  return new Date(date.seconds * 1000).toLocaleDateString("en-US")
}
