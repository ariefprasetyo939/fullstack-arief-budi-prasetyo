<script setup lang="ts">
    defineProps({
        workDirectory: {
            type: Object,
        }
    });
</script>

<template>
    <div v-if="workDirectory" class="p-2 pt-1 pb-1 fw-bold italic text-primary border-bottom">
        <i class="pi pi-folder-open"></i>
        {{ workDirectory?.name }}
    </div>

    <div v-else class="p-2 pt-1 pb-1 fw-bold italic text-danger border-bottom">
        <i class="pi pi-folder"></i>
        No Active Directory
    </div>
</template>