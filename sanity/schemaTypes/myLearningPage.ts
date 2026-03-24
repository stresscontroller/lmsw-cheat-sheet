import { defineField, defineType } from "sanity";
import { ProjectsIcon } from '@sanity/icons'

export const MyLearningPageType = defineType({
  name: "myLearning",
  title: "My Learning Page",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "altText",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
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
