export const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove non-digits
    .replace(/(.{4})/g, '$1 ') // Add space after every 4 digits
    .trim(); // Remove trailing space
};

export const formatExpiryDate = (value: string) => {
  const v = value.replace(/\D/g, ''); // remove non-digits
  if (v.length >= 3) return v.slice(0, 2) + '/' + v.slice(2, 4);
  return v;
};
