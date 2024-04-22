
const { Package } = require('./PackageSchema');
const { z } = require('zod');


module.exports.subscriptionSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  package: Package.nullable().optional(),
  userId: z.string(),
  state: z.enum(["pending", "accepted", "refused",]),
  refusal_reason: z.string().nullable().optional(),
  currentWebsites: z.number().int().default(0),
  currentTotalActions: z.number().int().default(0),
  currentApiKeys: z.number().int().default(0),
  renewDate: z.string(),
  duration_days: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
