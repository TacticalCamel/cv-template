import type Section from "@/models/sections/Section";
import type Project from "@/models/elements/Project";

export default interface ProjectSection extends Section<Project>{
    title: string
    elements: Project[]
    disclaimer: string
}