import { Hono } from 'hono'
import { blogTable, insertblogTable, newsTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"




const app = new Hono()
    .post('/post-blog',
        zValidator("json", insertblogTable.pick({
            slug: true,
            title: true,
            subtitle:  true,
            content:  true,
            coverimage:  true,
            authorName: true,
            authorAvatar: true,
            authorRole: true
        })),
        async (c) => {
            const values = c.req.valid("json");

            const [data] = await db.insert(blogTable).values({
                id: createId(),
                publishdate: String(Date.now()),
                ...values
            }).returning();

            return c.json({ data })
        })

export default app