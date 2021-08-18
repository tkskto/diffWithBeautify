<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import FileUploader from './FileUploader.svelte';
    const dispatch = createEventDispatcher();
    let oldFile = null;
    let newFile = null;
    let selectedTool = '0';

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
            selectedTool,
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
    <div class="inner tool">
        <div class="title">diff tool</div>
        <div class="row">
            <label><input type="radio" name="tool" value="0" bind:group={selectedTool}>jsdiff</label>
            /
            <label><input type="radio" name="tool" value="1" bind:group={selectedTool}>diff-match-patch</label>
        </div>
    </div>
    <button class="btn" disabled={!oldFile || !newFile} on:click={onClick}>OK</button>
</div>

<style>
    .dialog {
        position: absolute;
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 60%;
        height: 60%;
        padding: 24px 32px;
        background-color: #fffff9;
        border-radius: 10px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: 2px solid #fafaff;
        box-shadow: 20px 20px 60px #d9d9d4,
                    -20px -20px 60px #ffffff;
    }

    .inner {
        height: 50%;
        display: flex;
        flex-direction: column;
    }

    .tool {
        height: auto;
    }

    .title {
        margin-bottom: 8px;
    }

    .row {
        display: flex;
        gap: 20px;
        margin-top: 10px;
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
