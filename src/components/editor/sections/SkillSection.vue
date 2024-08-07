<script setup lang="ts">
    import draggable from "vuedraggable";
    import Skill from "@/models/elements/Skill";
    import SkillSection from "@/models/sections/SkillSection";
    import SkillCategory from "@/models/elements/SkillCategory";
    import RatingBar from "@/components/editor/RatingBar.vue";
    import EditText from "@/components/shared/EditText.vue";
    import IconDecrease from "@/components/icons/IconDecrease.vue";
    import IconIncrease from "@/components/icons/IconIncrease.vue";
    import ResumeSection from "@/components/editor/sections/ResumeSection.vue";
    import {checkGroupMatch} from "@/models/BuildingBlock";
    import {settings} from "@/main";

    const model = defineModel<SkillSection>({
        required: true
    });

    function decreaseSkillLevel(skill: Skill) {
        skill.level = Math.min(5, Math.max(0, skill.level - 1));
    }

    function increaseSkillLevel(skill: Skill) {
        skill.level = Math.min(5, Math.max(0, skill.level + 1));
    }
</script>

<template>
    <resume-section
        v-model="model"
        group="skill-category"
        grid-columns="1fr 1fr"
        :gap-x="2"
        :gap-y="1"
    >
        <template #item="{element: category}: {element: SkillCategory}">
            <div>
                <div class="flex">
                    <edit-text v-model="category.title" placeholder="Category name" class="text-lg pb-0.5"/>
                </div>

                <transition-group>
                    <draggable
                        v-model="category.elements"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        :disabled="!settings.editable"
                        :group="{name: 'skill', pull: true, put: checkGroupMatch}"
                    >
                        <template #item="{element: skill}: {element: Skill}">
                            <div class="flex p-0.5 text-nowrap items-center skill-row" :class="{'moveable': settings.editable}">
                                <rating-bar :value="skill.level" class="pe-3"/>

                                <edit-text v-model="skill.name" class="font-light skill-text" placeholder="Skill name"/>

                                <div v-if="settings.editable" class="ms-auto flex gap-1 skill-row-edit-controls">
                                    <button @click="decreaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-error text-error py-0.5 px-1.5 rounded transition-all">
                                        <icon-decrease class="size-4"/>
                                    </button>
                                    <button @click="increaseSkillLevel(skill)" class="bg-opacity-0 hover:bg-opacity-20 bg-success text-success py-0.5 px-1.5 rounded transition-all">
                                        <icon-increase class="size-4"/>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </transition-group>
            </div>
        </template>
    </resume-section>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .skill-row .skill-row-edit-controls {
        opacity: 0;
        transition: opacity 150ms;
    }

    .skill-row:hover .skill-row-edit-controls {
        opacity: 1;
    }

    .skill-row:has(.skill-text:focus-within) .skill-row-edit-controls {
        opacity: 0;
    }
</style>