<script setup lang="ts">
    import draggable from "vuedraggable";
    import EditText from "@/components/shared/EditText.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";
    import {settings} from "@/main";

    // except a list of strings as a model
    const model = defineModel<string[]>({
        required: true
    });
</script>

<template>
    <div>
        <transition-group>
            <draggable
                v-model="model"
                item-key="id"
                key="draggable"
                :disabled="!settings.editable"
                :group="{name: 'technology', pull: true, put: checkGroupMatch}"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="flex flex-wrap gap-2 text-sm items-start"
            >
                <template #item="{index}: {index: number}">
                    <div class="flex relative">
                        <span class="px-1 rounded bg-primary font-semibold shadow-sm shadow-[#000000bb] transition-all text-nowrap">
                            <edit-text v-model="model[index]" placeholder="Technology"/>
                        </span>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>