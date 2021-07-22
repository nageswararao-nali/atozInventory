export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });
};
