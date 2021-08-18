<script lang="ts">
    import MyWorker from '../assets/worker/diff?worker'
    import beautify from 'js-beautify';
    import {wrap} from 'comlink';
    import InputDialog from './InputDialog.svelte';
    import SameDialog from './SameDialog.svelte';

    const worker = new MyWorker();
    const diffFunctions = wrap(worker);
    let isFinished = false;
    let resultJsDiff = [];
    let resultDiffMatchPatch = '';
    let isSame = false;
    let tool = '0';

    worker.addEventListener('error', function (...args) {
        console.log(args);
    });

    async function start(data) {
        const {oldFile, newFile, selectedTool} = data.detail;

        tool = selectedTool;

        if (oldFile.content === newFile.content) {
            isSame = true;
        } else {
            const beautifiedOldText = beautify.js(oldFile.content);
            const beautifiedNewText = beautify.js(newFile.content);

            try {
                if (tool === '0') {
                    resultJsDiff = await diffFunctions.computeDiffWithJsDiff(beautifiedOldText, beautifiedNewText);
                    resultDiffMatchPatch = await diffFunctions.computeDiffWithDiffMatchPatch(beautifiedOldText, beautifiedNewText);
                } else {
                    resultDiffMatchPatch = await diffFunctions.computeDiffWithDiffMatchPatch(beautifiedOldText, beautifiedNewText);
                    resultJsDiff = await diffFunctions.computeDiffWithJsDiff(beautifiedOldText, beautifiedNewText);
                }

                resultDiffMatchPatch = resultDiffMatchPatch.replaceAll('<ins ', '<ins tabindex="0" ').replaceAll('<del ', '<del tabindex="0" ');
            } catch (err) {
                console.log(err);
            }
        }

        isFinished = true;
    }

    function reset() {
        isFinished = false;
        resultJsDiff = [];
        resultDiffMatchPatch = '';
    }
</script>

<div class="wrapper">
    {#if !isFinished}
        <InputDialog on:start={start} />
    {:else}
        <div class="head">
            <p>You can focus the point of difference with <kbd>Tab</kbd> key.</p>
            <label class="tool">
                <span>change diff tool</span>
                <select bind:value={tool}>
                    <option value="0">jsdiff</option>
                    <option value="1">diff-match-patch</option>
                </select>
            </label>
        </div>
        <div class="window">
            {#if isSame}
                <SameDialog on:close={reset} />
            {:else}
                <div class="part">
                    <pre><code>
                        {#if tool === '0'}
                            {#each resultJsDiff as item}
                                {#each item.value as line}
                                    {#if item.added}
                                        <div class="added" tabindex="0"><span class="mark">+</span>{line}</div>
                                    {:else if item.removed}
                                        <div class="removed" tabindex="0"><span class="mark">-</span>{line}</div>
                                    {:else}
                                        <div>{line}</div>
                                    {/if}
                                {/each}
                            {/each}
                        {:else if tool === '1'}
                            {@html resultDiffMatchPatch}
                        {/if}
                    </code></pre>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .wrapper {
        position: relative;
        width: 100%;
        height: calc(100vh - 62px);
        margin-top: -10px;
        padding: 8px 0;
        box-sizing: border-box;
    }
    .tool {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
        font-size: 14px;
    }
    .head p {
        margin: 0;
    }
    .window {
        display: flex;
        overflow-y: auto;
        height: 100%;
    }
    .part {
        width: 100%;
        height: 100%;
        padding: 20px 8px 8px;
        box-sizing: border-box;
        overflow-x: auto;
        white-space: pre;
    }
    .added {
        width: fit-content;
        background-color: #e6ffe6;
    }
    .removed {
        width: fit-content;
        background-color: #ffe6e6;
    }
    .mark {
        display: inline-block;
        text-align: center;
        width: 20px;
        margin-right: 4px;
    }
</style>
