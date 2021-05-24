<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import FileUploader from './FileUploader.svelte';
    const dispatch = createEventDispatcher();
    let oldFile = null;
    let newFile = null;

    function onUploadedFirst(data) {
        oldFile = data.detail.uploadedData;
    }

    function onUploadedSecond(data) {
        newFile = data.detail.uploadedData;
    }

    function onClick() {
        dispatch('start', {
            oldFile,
            newFile,
        });
    }
</script>

<div class="dialog">
    <div class="inner">
        <div class="title">Old File</div>
        <FileUploader on:uploaded={onUploadedFirst}/>
    </div>
    <div class="inner">
        <div class="title">New File</div>
        <FileUploader on:uploaded={onUploadedSecond}/>
    </div>
    <button class="btn" disabled={!oldFile || !newFile} on:click={onClick}>OK</button>
</div>

<style>
    .dialog {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 60%;
        height: 50%;
        padding: 16px;
        background-color: #ffffff;
        border-radius: 6px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        box-shadow: 0 0 10px 10px rgba(100, 100, 255, 0.05);
    }

    .inner {
        height: 50%;
        display: flex;
        flex-direction: column;
    }

    .title {
        margin-bottom: 8px;
    }

    .btn {
        border: none;
        background: none;
        box-shadow: none;
        display: inline-block;
        margin-left: auto;
        padding: 10px 14px;
    }

    .btn:not([disabled]) {
        cursor: pointer;
    }
</style>
