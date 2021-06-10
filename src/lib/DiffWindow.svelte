<script lang="ts">
    import MyWorker from '../assets/worker/diff?worker'
    import beautify from 'js-beautify';
    import {wrap} from 'comlink';
    import InputDialog from './InputDialog.svelte';
    import SameDialog from './SameDialog.svelte';

    const worker = new MyWorker();
    let isFinished = false;
    let result = [];
    let isSame = false;
    let html = '';

    worker.addEventListener('error', function (...args) {
        console.log(args);
    });

    async function start(data) {
        const {oldFile, newFile} = data.detail;

        if (oldFile.content === newFile.content) {
            isSame = true;
        } else {
            const beautifiedOldText = beautify.js(oldFile.content);
            const beautifiedNewText = beautify.js(newFile.content);
            const computeDiff = wrap(worker);

            try {
                html = await computeDiff(beautifiedOldText, beautifiedNewText);
            } catch (err) {
                console.log(err);
            }
        }

        isFinished = true;
    }

    function reset() {
        isFinished = false;
        result = [];
        isSame = false;
    }
</script>

<div class="wrapper">
    <div class="window">
        {#if isSame}
            <SameDialog on:close={reset} />
        {:else}
            <div class="part">
                <pre><code>
                    {@html html}
                </code></pre>
            </div>
        {/if}
    </div>
    {#if !isFinished}
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
        /*font-family: monospace;*/
        white-space: pre;
    }
</style>
