<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function onClick() {
        dispatch('close');
    }
</script>

<div class="dialog">
    <p>There is no different.</p>
    <button class="btn" on:click={onClick}>OK</button>
</div>

<style>
    .dialog {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 60%;
        height: 50%;
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

    .btn {
        border: none;
        background: none;
        box-shadow: none;
        display: inline-block;
        margin-left: auto;
        padding: 10px 14px;
        cursor: pointer;
    }
</style>
