const { z } = require('zod');


module.exports.Package = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    fullDescription: z.string(),
    active: z.boolean(),
    usersCount: z.number().int(),
    maxWebsites: z.number().int(),
    maxActions: z.number().int(),
    maxApiKeys: z.number().int(),
    price: z.number(),
    afterDiscount: z.number().nullable().optional(),
    totalPatients: z.number().int(),
    thisMonthPatients: z.number().int(),
    lastMonthPatients: z.number().int(),
    duration: z.enum(['monthly', 'yearly', 'trail',]),
    isPopular: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
});

