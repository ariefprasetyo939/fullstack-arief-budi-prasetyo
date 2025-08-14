<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import FolderList from './components/FolderList.vue';
  import FolderTree from './components/FolderTree.vue';
  import WorkDirectory from './components/WorkDirectory.vue';
  import axios from 'axios';

  const folders = ref([]);
  const selectedFolder = ref(null);

  //fetch folders from API
  const fetchFolders = async () => {
    try {
      const res  = await axios.get('http://localhost:3000/api/v1/folder');
      folders.value = res.data;
    } catch (error) {
      console.log("Error fetching folders", error);
    }
  }

  //handle create-folder event from child component (FolderTree)
  const handleCreateFolder = async (payload: {
    name: string;
    parentId: number | null;
  }) => {
    try {
      await axios.post('http://localhost:3000/api/v1/folder', payload);
      await fetchFolders();
    } catch (error) {
      console.log("Error creating folder", error);
    }
  }

  const updateFolderInState = (id: number, name: string) => {
    const updateRecursive = (arr: any[]) => {
      for (let f of arr) {
        if (f.id === id) {
          f.name = name;
          return true;
        }
        if (f.children?.length) {
          if (updateRecursive(f.children)) return true;
        }
      }
      return false;
    };
    updateRecursive(folders.value);
  };

  //handle update folder
  const handleUpdateFolder = async (payload: {
    id: number;
    name: string;
  }) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/folder/${payload.id}`, payload);
      updateFolderInState(payload.id, payload.name);
      await fetchFolders();
    } catch (error) {
      console.log("Error updating folder", error);
    }
  }

  (folder: null) => {
    selectedFolder.value = folder
  }

  onMounted(async () => {
    await fetchFolders();
  })
</script>

<template>
  <WorkDirectory :workDirectory="selectedFolder" />
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div class="border-end col-3 ps-0">
        <h6 class="border-bottom fw-bold p-2">Directory</h6>
        <FolderTree 
          :folders="folders" 
          :selectedFolder="selectedFolder"
          v-model:folder-selected="selectedFolder" 
          @create-folder="handleCreateFolder"
          @rename-folder="handleUpdateFolder"/>
      </div>

      <div class="col-9">
        <FolderList :folder="selectedFolder" />
      </div>
    </div>
  </div>
</template>