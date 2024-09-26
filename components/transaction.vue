<template>
  <div
    class="grid grid-cols-2 border-b py-4 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex justify-between items-center">
      <div class="flex space-x-2 items-center">
        <UIcon :name="icon" :class="[iconColor]" />
        <div>{{ transactions.description }}</div>
      </div>
      <div>
        <UBadge color="white" v-if="transactions.category">{{
          transactions.category
        }}</UBadge>
      </div>
    </div>

    <div class="flex justify-end space-x-1 items-center">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            :loading="isLoading"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  transactions: Object,
});

const emit = defineEmits(["deleted"]);

const isIncome = computed(() => props.transactions.type === "Income");
const icon = computed(() =>
  isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-left"
);

const iconColor = computed(() =>
  isIncome.value ? "text-green-600" : "text-red-600"
);

const { currency } = useCurrency(props.transactions.amount);

const isLoading = ref(false);
const toast = useToast();
const supabase = useSupabaseClient();

const deleteTransaction = async () => {
  isLoading.value = true;
  try {
    await supabase
      .from("transactions")
      .delete()
      .eq("id", props.transactions.id);
    toast.add({
      title: "Transaction deleted",
      icon: "i-heroicons-check-circle",
      color: "green",
    });
    emit("deleted", props.transactions.id);
  } catch (error) {
    toast.add({
      title: "Transaction deleted",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: deleteTransaction,
    },
  ],
];
</script>
