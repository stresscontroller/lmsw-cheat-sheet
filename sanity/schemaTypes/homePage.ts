import { defineArrayMember, defineField, defineType } from "sanity";
import { EarthAmericasIcon } from '@sanity/icons'

export const HomePageType = defineType({
  name: "home_page",
  title: "Home Page",
  icon: EarthAmericasIcon,
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
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
      name: "image",
      title: "Image",
      type: "document",
      fields: [
        defineField({
          name: "file",
          title: "File",
          type: "image",
          options: {
            accept: ".jpg, .png, .jpeg, .gif"
          },
        }),
        defineField({
          name: "altText",
          title: "Alt Text",
          type: "string",
        }),
      ],
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
              name: "type",
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
              name: "image",
              type: "image",
              options: {
                accept: ".jpg, .png, .jpeg, .gif"
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
