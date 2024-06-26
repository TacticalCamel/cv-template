<script setup lang="ts">
    import {inject} from "vue";
    import type SettingsModel from "@/models/SettingsModel";

    const settings = inject<SettingsModel>('settings', {} as SettingsModel);

    const model = defineModel({
        type: String,
        required: true
    });

    defineProps({
        placeholder: {
            type: String,
            required: false,
            default: '...'
        }
    });

    const emit = defineEmits<{
        change: [value: string]
    }>();

    function saveModelChanges(e: Event) {
        const value = (e.target as HTMLElement).innerText;

        model.value = value;
        emit('change', value);
    }
</script>

<template>
    <div class="relative" :class="{'editable': settings.editable}">
        <div class="text-input" :contenteditable="settings.editable" @focusout="saveModelChanges">{{ model }}</div>
        <div class="text-overlay size-full absolute pointer-events-none start-0 top-0 hidden text-center">{{ model.length ? undefined : placeholder }}</div>
    </div>
</template>

<style scoped>
    .editable {
        border-radius: 0.25rem;
        transition: background-color 150ms;
    }

    .editable:hover{
        background-color: rgb(var(--primary) / 0.2);
    }

    .editable .text-input {
        border-radius: 0.25rem;
        outline: transparent;
        transition: outline-color 150ms;
    }

    .editable .text-input:empty{
        min-width: 3ch;
    }

    .editable .text-input:focus {
        outline: 2px dashed rgb(var(--warning));
    }

    .editable:not(:has(.text-input:focus)) .text-overlay {
        display: block;
        text-transform: none;
        opacity: 0.6;
    }
</style>