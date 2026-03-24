import { defineField, defineType } from "sanity";
import {HelpCircleIcon} from '@sanity/icons'

export const FAQType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "order",
      type: "number",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "content",
      type: "text",
    }),
    defineField({
      name: "active",
      type: "boolean",
    }),
  ],
  orderings: [
    {
      title: "Order Ascending",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
