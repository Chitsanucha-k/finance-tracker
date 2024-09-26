<template>
  <div
    class="grid grid-cols-2 border-b py-4 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex justify-between items-center">{{ date }}</div>

    <div class="flex justify-end space-x-1 items-center mr-10">
      <div>{{ currency }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  date: String,
  transactions: Array,
});

const sum = computed(() => {
  let sum = 0;
  for (const transaction of props.transactions) {
    if (transaction === "Income") {
      sum += transaction.amount;
    } else {
      sum -= transaction.amount;
    }
  }
  return sum;
});

const { currency } = useCurrency(sum);
</script>
