<script lang="ts">
    import beautify from 'js-beautify';
    import {diffArrays} from 'diff';
    import InputDialog from './InputDialog.svelte';
    let result = [];

    function start(data) {
        const {oldFile, newFile} = data.detail;
        const beautifiedOldFile = beautify.js(oldFile.content);
        const beautifiedNewFile = beautify.js(newFile.content);
        const splitedOldFile = beautifiedOldFile.split(/\r|\n|\r\n/);
        const splitedNewFile = beautifiedNewFile.split(/\r|\n|\r\n/);

        result = diffArrays(splitedOldFile, splitedNewFile);
    }
</script>

<div class="wrapper">
    <div class="window">
        <div class="part">
            <pre><code>
                {#each result as item}
                    {#each item.value as line}
                        {#if item.added}
                            <div class="added"><span class="mark">+</span>{line}</div>
                        {:else if item.removed}
                            <div class="removed"><span class="mark">-</span>{line}</div>
                        {:else}
                            <div>{line}</div>
                        {/if}
                    {/each}
                {/each}
            </code></pre>
        </div>
    </div>
    {#if result.length === 0}
        <InputDialog on:start={start} />
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        width: 100%;
        height: calc(100vh - 43px);
        margin-top: -10px;
    }
    .window {
        display: flex;
        overflow-y: auto;
        height: 100%;
    }
    .part {
        width: 100%;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
        overflow-x: auto;
    }
    .added {
        background-color: rgba(0, 255, 0, 0.3);
    }
    .removed {
        background-color: rgba(255, 0, 0, 0.3);
    }
    .mark {
        display: inline-block;
        text-align: center;
        width: 20px;
        margin-right: 4px;
    }
</style>
