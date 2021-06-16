<script lang="ts">
  import TabController from './lib/TabController.svelte';
  import DiffWindow from './lib/DiffWindow.svelte';
  let tabCount = 1;
  let selectedTabIndex = 0;

  function onUpdateTab(e) {
    tabCount = e.detail.tabCount;
    selectedTabIndex = e.detail.selectedTabIndex;
  }
</script>

<main>
  <TabController on:update={onUpdateTab} />
  {#each Array(tabCount) as _, index}
    <div class="window" class:selected="{selectedTabIndex === index}">
      <DiffWindow />
    </div>
  {/each}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .window {
    display: none;
  }

  .selected {
    display: block;
  }
</style>
