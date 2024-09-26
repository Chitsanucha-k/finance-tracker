<template>
  <div
    class="grid grid-cols-2 border-b py-4 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex justify-between items-center">
      <div class="flex space-x-1 items-center">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-600" />
        <div>Salary</div>
      </div>
      <div>
        <UBadge color="white"> Catagory</UBadge>
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
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
const { currency } = useCurrency(3500);

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
      click: () => console.log("Delete"),
    },
  ],
];
</script>
