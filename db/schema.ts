import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"


export const newsTable = pgTable("news_table", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    company: text("company").notNull(),
    marketingSpend: text("marketing_spend"),
    location: text("location").notNull(),
    content: text("content").notNull(),
});

export const insertContactSchema = createInsertSchema(newsTable)