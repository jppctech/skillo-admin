import { pgTable, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const newsTable = pgTable("news_table", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phone: text().notNull(),
	company: text().notNull(),
	marketingSpend: text("marketing_spend"),
	location: text().notNull(),
	content: text().notNull(),
});
