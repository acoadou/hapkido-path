import { defineCollection, z } from 'astro:content';

const belts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    rankName: z.string(),
    summary: z.string(),
    objectives: z.array(z.string()),
    techniqueGroups: z.array(z.string()),
    principles: z.array(z.string()),
    koreanTopics: z.array(z.string()),
    checklist: z.array(z.string()),
    examChecklist: z.array(z.string()).default([]),
    relatedTechniques: z.array(z.string()).default([])
  })
});

const techniques = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    beltLevel: z.string(),
    attackType: z.string(),
    corePrinciple: z.string(),
    riskAreas: z.array(z.string()),
    principles: z.array(z.string()),
    relatedTechniques: z.array(z.string()),
    summary: z.string(),
    order: z.number()
  })
});

const principles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    relatedTechniques: z.array(z.string()),
    order: z.number()
  })
});

const korean = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    order: z.number()
  })
});

export const collections = { belts, techniques, principles, korean };
