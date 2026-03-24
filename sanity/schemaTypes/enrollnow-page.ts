import { defineField, defineType, defineArrayMember } from "sanity";
import {BillIcon} from '@sanity/icons'

export const EnrollNowPageType = defineType({
  name: "enrollnow_page",
  title: "Enroll Now Page",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "price",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        accept: ".jpg, .png, .jpeg, .gif",
      },
    }),
    defineField({
      name: "lists",
      title: "Lists",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
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
              name: "description",
              type: "text",
            }),
            defineField({
              name: "image",
              type: "image",
              options: {
                accept: ".jpg, .png, .jpeg, .gif",
              },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
    },
    prepare(selection) {
      const { order } = selection;
      return {
        title: `Section ${order}`,
        // subtitle: `Page Number: ${order}`,
      };
    },
  },
  orderings: [
    {
      title: "Order Ascending",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
