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

export const blogTable = pgTable("blog-table", {
    id: text("id").primaryKey().notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    subtitle:  text("sub_title").notNull(),
    content:  text("content").notNull(),
    publishdate:  text("publish_date"),
    coverimage:  text("cover_image").notNull(),
    authorName:  text("author").notNull(),
    authorAvatar: text("author_avatar"),
    authorRole: text("author_role").notNull()
})

export const insertblogTable = createInsertSchema(blogTable)