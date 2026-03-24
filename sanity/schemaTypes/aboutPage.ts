import { defineField, defineType } from "sanity";
import { UserIcon } from '@sanity/icons'

export const AboutUsPageType = defineType({
  name: "about_page",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
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
