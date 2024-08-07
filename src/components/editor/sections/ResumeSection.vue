<script setup lang="ts" generic="T">
    import { reactive } from "vue";
    import draggable from "vuedraggable";
    import Section from "@/models/sections/Section";
    import IconInfo from "@/components/icons/IconInfo.vue";
    import EditText from "@/components/shared/EditText.vue";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import { settings } from "@/main";

    const props = defineProps({
        group: {type: String, required: true},
        gridColumns: {type: String, default: 'min-content'},
        subGridColumns: {type: Number, default: 1},
        gapX: {type: Number, default: 0},
        gapY: {type: Number, default: 0}
    });

    const model = defineModel<Section<T>>({
        required: true
    });

    const outerGridStyle = reactive({
        'grid-template-columns': props.gridColumns,
        'gap': `${props.gapY}rem ${props.gapX}rem`
    });

    const innerGridStyle = reactive({
        'grid-column': `span ${props.subGridColumns} / span ${props.subGridColumns}`
    })
</script>

<template>
    <div v-if="settings.editable || model.elements.length">
        <div class="flex flex-col items-start">
            <edit-text v-model="model.title" placeholder="Section title" class="uppercase text-2xl"/>
        </div>

        <slot name="header"/>

        <transition-group>
            <draggable
                v-model="model.elements"
                item-key="id"
                key="draggable"
                drag-class="dragging"
                ghost-class="ghost"
                animation="200"
                class="grid p-2 pe-0"
                :disabled="!settings.editable"
                :group="{name: group, pull: true, put: checkGroupMatch}"
                :style="outerGridStyle"
            >
                <template #item="{element, index}: {element: T, index: number}">
                    <div class="grid grid-cols-subgrid" :class="{'moveable': settings.editable}" :style="innerGridStyle">
                        <slot name="item" :element="element" :index="index"/>
                    </div>
                </template>

                <template #footer v-if="settings.editable && !model.elements.length">
                    <div class="h-16 w-[720px] rounded-lg border-2 border-info border-dashed flex items-center justify-center gap-2 text-info bg-info bg-opacity-10">
                        <icon-info class="size-6"/>
                        <span>Empty section will not be displayed - drag items here to add content</span>
                    </div>
                </template>
            </draggable>
        </transition-group>
    </div>
</template>