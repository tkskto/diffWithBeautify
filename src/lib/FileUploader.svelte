<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let isDragEnter = false;
    const uploadedData: {name: string, content: string} = {};
    const reader = new FileReader();

    function onReadComplete(e) {
        uploadedData.content = e.target.result;

        dispatch('uploaded', {
            uploadedData,
        });
    }

    reader.addEventListener('load', onReadComplete)

    function onDrop(e: DragEvent): void {
        e.preventDefault();
        e.stopPropagation();

        const {dataTransfer} = e;
        const {files} = dataTransfer;

        if (files.length < 1) {
            e.target.value = null;

            return;
        }

        const [file] = files;

        uploadedData.name = file.name;
        reader.readAsText(file);

        isDragEnter = false;
    }

    function onDragEnter(e): void {
        e.preventDefault();
        e.stopPropagation();
        isDragEnter = true;
    }

    function onDragLeave(e): void {
        isDragEnter = false;
    }

    function onFileSelected(e: InputEvent): void {
        const {files} = e.target;

        if (files.length < 1) {
            e.target.value = null;

            return;
        }

        const [file] = files;

        uploadedData.name = file.name;
        reader.readAsText(file);
    }
</script>

<div class="wrapper">
    <label
        class="inner"
        class:dragEnter={isDragEnter}
        draggable="true"
        on:drop={onDrop}
        on:dragenter={onDragEnter}
        on:dragover={onDragEnter}
        on:dragleave={onDragLeave}
    >
        {#if uploadedData.name && uploadedData.content}
            <span>{uploadedData.name}</span>
        {:else }
            <span>drag and drop or click here to upload file.</span>
        {/if}
        <input type="file" accept=".js" on:change={onFileSelected}>
    </label>
</div>

<style>
    .wrapper {
        height: 100%;
    }
    .inner {
        background-color: #ccc;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        height: 100%;
    }
    .dragEnter {
        background-color: #999;
    }
    input[type="file"] {
        position: absolute;
        z-index: -1;
    }
</style>
