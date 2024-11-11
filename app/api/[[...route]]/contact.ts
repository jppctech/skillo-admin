import { Hono } from 'hono'
import { newsTable } from '@/db/schema';
import { db } from '@/db/drizzle';



const app = new Hono()
    .get('/',
        async (c) => {
            const data = await db
                .select({
                    id: newsTable.id,
                    name: newsTable.name,
                    email: newsTable.email,
                    company: newsTable.company,
                    marketingSpend: newsTable.marketingSpend,
                    phone: newsTable.phone,
                    location: newsTable.location,
                    content: newsTable.content,
                })
                .from(newsTable)

            return c.json({data})
        })

export default app