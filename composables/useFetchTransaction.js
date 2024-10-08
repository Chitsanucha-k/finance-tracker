export const useFetchTransaction = (period) => {
  const supabase = useSupabaseClient();
  const pending = ref(false);
  const transactions = ref([]);

  const income = computed(() =>
    transactions.value.filter((t) => t.type === "Income")
  );
  const expense = computed(() =>
    transactions.value.filter((t) => t.type === "Expense")
  );

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);

  const incomeTotal = computed(() =>
    income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  );
  const expenseTotal = computed(() =>
    expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  const fetchData = async () => {
    pending.value = true;
    try {
      const { data } = await useAsyncData(
        `transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`,
        async () => {
          const { data, error } = await supabase
            .from("transactions")
            .select()
            .gte("created_at", period.value.from.toISOString())
            .lte("created_at", period.value.to.toISOString())
            .order("created_at", { ascending: false });
          return data;
        }
      );
      return data.value;
    } catch (error) {
      return [];
    } finally {
      pending.value = false;
    }
  };
  const refreshData = async () => (transactions.value = await fetchData());

  // Watch
  watch(period, async () => await refreshData());

  const transactionsGroupedByDate = computed(() => {
    let grouped = {};

    for (const transaction of transactions.value) {
      const date = new Date(transaction.created_at).toISOString().split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    }
    return grouped;
  });

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate,
      },
      income,
      expense,
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal,
    },
    refreshData,
    pending,
  };
};
