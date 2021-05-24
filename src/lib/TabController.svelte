<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let selectedTabIndex = 0;
    let tabCount = 1;

    function changeTab(index: number): void {
        selectedTabIndex = index;
        dispatch('update', {
            selectedTabIndex,
            tabCount,
        });
    }

    function addTab(): void {
        tabCount++;
        changeTab(tabCount - 1);
    }
</script>

<div class="tabController">
    <div class="tab">
        {#each Array(tabCount) as _, index}
            <button class="button" class:selected="{selectedTabIndex === (index)}" on:click={() => changeTab(index)}>{index + 1}</button>
        {/each}
        <button class="button" on:click={addTab}>+</button>
    </div>
</div>

<style>
    .tabController {
        padding-bottom: 10px;
        overflow-x: scroll;
    }
    .tab {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #eaeaea;
    }
    .button {
        flex-shrink: 0;
        border: none;
        border-right: 1px solid #fffff9;
        display: inline-block;
        padding: 4px 30px;
        font-size: 14px;
        margin-top: 7px;
        cursor: pointer;
        border-radius: 3px 3px 0 0;
    }
    .button:last-child {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 12px;
    }

    .button.selected {
        margin-top: 0;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
        background-color: #fffff9;
    }
</style>
