export const useCurrency = (amount) => {
  const currency = computed(() => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(isRef(amount) ? amount.value : amount);
  });
  return { currency };
};
