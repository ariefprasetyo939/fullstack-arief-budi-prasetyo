<script setup lang="ts">
import { defineProps } from 'vue';
import Message from 'primevue/message';


defineProps({
    folder: Object
})
</script>

<template>
    <div>
        <h6 v-if="folder" class="border-bottom fw-bold p-2">Subfolders</h6>
        
        <ul v-if="folder?.children?.length" class="list-group list-group-flush">
            <li v-for="subfolder in folder.children" :key="subfolder.id" class="list-group-item">
                {{ subfolder.name }}
            </li>
        </ul>
        <div v-else-if="folder" class="d-flex justify-content-center align-items-center vh-100">
            <Message severity="error">No subfolders found</Message>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center vh-100 fw-bold">
            <Message severity="info">Select a folder to view its subfolders</Message>
        </div>
    </div>
</template>