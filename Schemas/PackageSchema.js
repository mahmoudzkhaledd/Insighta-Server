const { z } = require('zod');


module.exports.Package = z.object({
    id: z.string(),
    name: z.string(),
    maxGraphPoints: z.nullable(z.number()),
    description: z.string(),
    fullDescription: z.string(),
    active: z.boolean(),
    usersCount: z.number().int(),
    maxWebsites: z.number().int(),
    maxActions: z.number().int(),
    maxApiKeys: z.number().int(),
    price: z.number(),
    afterDiscount: z.number().nullable().optional(),
    
    
    duration: z.enum(['monthly', 'yearly', 'trail',]),
    isPopular: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
});

