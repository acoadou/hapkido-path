import { defineCollection, z } from 'astro:content';


const visualFrameSchema = z.object({
  id: z.string(),
  file: z.string().regex(/\.(png|jpe?g)$/i, 'Technique visuals support PNG, JPG, and JPEG files.'),
  caption: z.string(),
  alt: z.string().optional()
});

const visualsSchema = z.object({
  base_path: z.string(),
  frames: z.array(visualFrameSchema).optional(),
  groups: z.array(z.object({
    title: z.string().optional(),
    frames: z.array(visualFrameSchema)
  })).optional()
});

const belts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    rankName: z.string().default('Learning level'),
    summary: z.string().default(''),
    objectives: z.array(z.string()).default([]),
    techniqueGroups: z.array(z.string()).default([]),
    principles: z.array(z.string()).default([]),
    koreanTopics: z.array(z.string()).default([]),
    checklist: z.array(z.string()).default([]),
    examChecklist: z.array(z.string()).default([]),
    relatedTechniques: z.array(z.string()).default([])
  })
});

const learn = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string().default('lesson'),
    belt: z.string().default(''),
    order: z.number().default(0),
    lesson_number: z.number().optional(),
    status: z.string().default('placeholder'),
    summary: z.string().default(''),
    techniques: z.array(z.string()).default([]),
    principles: z.array(z.string()).default([]),
    estimated_time: z.string().optional(),
    objectives: z.array(z.string()).default([]),
    checklist: z.array(z.string()).default([])
  })
});

const techniques = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string().default('technique'),
    school_name: z.string().optional(),
    tedeschi_reference_name: z.string().default(''),
    tedeschi_reference_page: z.string().default(''),
    alternate_names: z.array(z.string()).default([]),
    belt: z.string().optional(),
    beltLevel: z.string().optional(),
    category: z.string().default('uncategorized'),
    attack: z.string().optional(),
    attackType: z.string().optional(),
    corePrinciple: z.string().optional(),
    principles: z.array(z.string()).default([]),
    risks: z.array(z.string()).optional(),
    riskAreas: z.array(z.string()).optional(),
    partner_required: z.boolean().default(true),
    solo_practice: z.string().default('limited'),
    exam_relevant: z.boolean().default(false),
    status: z.string().default('draft'),
    lessons: z.array(z.string()).default([]),
    relatedTechniques: z.array(z.string()).default([]),
    summary: z.string().default(''),
    order: z.number().default(0),
    visuals: visualsSchema.optional()
  })
});

const principles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string().default('principle'),
    principle_id: z.string().optional(),
    summary: z.string().default(''),
    related_techniques: z.array(z.string()).optional(),
    relatedTechniques: z.array(z.string()).optional(),
    status: z.string().default('draft'),
    order: z.number().default(0)
  })
});


const reference = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    order: z.number().default(0),
    status: z.string().default('draft')
  })
});

export const collections = { belts, learn, techniques, principles, reference };
