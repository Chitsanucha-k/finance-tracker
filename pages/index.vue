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
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="red"
      title="Expense"
      :amount="4000"
      :last-amount="5000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="red"
      title="Saving"
      :amount="4000"
      :last-amount="4100"
      :loading="false"
    />
  </section>

  <section>
    <Transaction />
    <Transaction />
    <Transaction />
    <Transaction />
  </section>
</template>

<script setup>
import { transactionViewOption } from "~/constants";
const selectedView = ref(transactionViewOption[1]);
</script>
