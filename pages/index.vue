<template>
  <section class="flex justify-between items-center mb-5">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <USelectMenu v-model="selectedView" :options="transactionViewOption" />
  </section>
  <section
    class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      color="red"
      title="Expense"
      :amount="expenseTotal"
      :last-amount="5000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      color="red"
      title="Saving"
      :amount="4000"
      :last-amount="4100"
      :loading="isLoading"
    />
  </section>

  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <UModal v-model="isOpen">
        <UCard>
          <template #header> Add Transaction </template>
          <div>Yoo!</div>
        </UCard>
      </UModal>
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>

  <section v-if="!isLoading">
    <div
      v-for="(transactionOnDay, date) in transactionsGroupedByDate"
      :key="date"
      class="mb-5"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionOnDay" />
      <Transaction
        v-for="transaction in transactionOnDay"
        :key="transaction.id"
        :transactions="transaction"
        @deleted="refreshData()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>

<script setup>
import { transactionViewOption } from "~/constants";
const selectedView = ref(transactionViewOption[1]);

const supabase = useSupabaseClient();
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

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
  isLoading.value = true;
  try {
    const { data } = await useAsyncData("transactions", async () => {
      const { data, error } = await supabase.from("transactions").select();
      return data;
    });
    return data.value;
  } catch (error) {
    return [];
  } finally {
    isLoading.value = false;
  }
};

const refreshData = async () => (transactions.value = await fetchData());
transactions.value = await fetchData();

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
</script>
