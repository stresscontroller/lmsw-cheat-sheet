import { defineField, defineType } from "sanity";
import {FaceHappyIcon} from '@sanity/icons'

export const ThanksPageType = defineType({
  name: "thanks_page",
  title: "Thank You Pages",
  type: "document",
  icon: FaceHappyIcon,
  fields: [
    defineField({
      name: "type",
      type: "string",
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
      type: "image",
      options: {
        accept: ".jpg, .png, .jpeg, .gif"
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
    },
    prepare(selection) {
      const { type } = selection;
      return {
        title: `Thank you ${type} Page`,
        // subtitle: `Page Number: ${order}`,
      };
    },
  },
});
