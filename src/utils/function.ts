export const firebase_date_converter = (date: { seconds: number }) => {
  return new Date(date.seconds * 1000).toLocaleDateString("en-US");
};
