<script setup lang="ts">
    import type { PropType, Ref } from 'vue';
    import FolderTree from './FolderTree.vue';
    import ContextMenu, { type ContextMenuMethods } from 'primevue/contextmenu';
    import Dialog from 'primevue/dialog';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import { ref } from 'vue';
    import Toast from 'primevue/toast';
    import { useToast } from "primevue/usetoast";
    
    interface Folder {
        id: number;
        name: string;
        parentId: number | null;
        isOpen: boolean;
        children?: Folder[];
    }

    defineProps({
        folders:{
            type: Array as PropType<Folder[]>,
            required: true
        },
        selectedFolder: {
            type: Object as PropType<Folder | null>,
            default: null
        }
    })

    const toast = useToast();
    const emit = defineEmits([
        'update:folder-selected',
        'create-folder',
        'rename-folder'
    ]);
    const selectFolder = (folder: Folder) => {
        if(folder.children?.length) {
            // for open and close folder
            folder.isOpen = !folder.isOpen
        }
        //emit event to parent component to update right panel
        emit('update:folder-selected', folder);
    }

    // state
    const addModalVisible = ref(false);
    const newFolderName = ref('');
    const targetFolder = ref<Folder | null>(null);

    const dialogMode = ref<'create' | 'rename'>('create');

    //context menu function
    const showFolderDialog = (folder: Folder, mode: 'create' | 'rename') => {
        targetFolder.value = folder;
        dialogMode.value = mode;

        if(mode === 'create'){
            newFolderName.value = '';
        } else {
            newFolderName.value = folder.name;
        }
        
        addModalVisible.value = true;
    }

    //handle form submit
    const handleFormSubmit = () => {
        if(!newFolderName.value.trim()) return;

        if(dialogMode.value === 'create') {
            emit('create-folder', {
                name: newFolderName.value,
                parentId: targetFolder.value?.id || null
            });
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Folder created successfully',
                life: 3000
            })
        } else if(dialogMode.value === 'rename' && targetFolder.value) {
            emit('rename-folder', {
                id: targetFolder.value.id,
                name: newFolderName.value
            });
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Folder renamed successfully',
                life: 3000
            })
        }

        addModalVisible.value = false;
    }

    const contextMenu: Ref<ContextMenuMethods | null> = ref(null);
    const contextFolder = ref<Folder | null>(null);

    const items = ref([
        {
            label: 'New Folder',
            icon: 'pi pi-folder-plus',
            command: () => {
                if(contextFolder.value) {
                    showFolderDialog(contextFolder.value, 'create');
                }
            }
        },
        {
            label: 'Rename',
            icon: 'pi pi-pencil',
            command: () => {
                if(contextFolder.value) {
                    showFolderDialog(contextFolder.value, 'rename');
                }
            }
        }
    ]);

    const onRightClick = (event: MouseEvent, folder: Folder) => {
        contextFolder.value = folder;
        contextMenu.value?.show(event);
    }
    
    const onContainerRightClick = (event: MouseEvent) => contextMenu.value?.show(event);
</script>

<style scoped>
    ul {
        padding-left: 15px;
    }

    .active {
        background-color: #cce5ff;
        color: black;
    }
</style>

<template>
    <div
        class="folder-tree-container"
        @contextmenu.prevent="onContainerRightClick"
        style="user-select: none;">
        <ul class="list-group list-group-flush ps-0">
            <li v-for="folder in folders" :key="folder.id" class="list-group-item p-1">
                <div class="ps-1 d-flex align-items-center"
                    @click.stop="selectFolder(folder)"
                    @contextmenu.prevent="onRightClick($event, folder)"
                    style="cursor:pointer"
                    :class="{ active: selectedFolder?.id === folder.id }">

                    <span class="me-2">
                        <i v-if="folder.children?.length"
                            :class="folder.isOpen ? 'pi pi-folder-open' : 'pi pi-folder'"></i>
                        <i v-else class="pi pi-folder"></i>
                    </span>
                    {{ folder.name }}
                </div>

                <!-- recursive component -->
                <FolderTree 
                    v-if="folder.isOpen && folder.children?.length"
                    :folders="folder.children"
                    :selectedFolder="selectedFolder"
                    @update:folder-selected="$emit('update:folder-selected', $event)"
                    @create-folder="$emit('create-folder', $event)"></FolderTree>
            </li>
        </ul>

        <ContextMenu ref="contextMenu" :model="items" />
        <Toast />
        <!-- dialog for new folder -->
        <Dialog 
            v-model:visible="addModalVisible"
            :header="dialogMode === 'create' ? 'Create New Folder' : 'Rename Folder'"
            modal="true"
            style="{ width: '350px' }">
                <div class="flex items-center gap-4 mb-4">
                    <label for="folderName" class="font-semibold w-24">Folder Name</label><br>
                    <InputText id="folderName" class="flex-auto" autocomplete="off" 
                        v-model="newFolderName"
                        placeholder="Enter folder name"/>
                </div>
            <template #footer>
                <Button label="Cancel" severity="secondary" @click="addModalVisible = false" />
                <Button :label="dialogMode === 'create' ? 'Create' : 'Rename'" @click="handleFormSubmit" />
            </template>
        </Dialog>
    </div>
</template>
