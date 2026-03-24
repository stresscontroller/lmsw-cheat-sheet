import { defineField, defineType } from "sanity";
import {AddCommentIcon} from '@sanity/icons'

export const FreeTutoringSessionPageType = defineType({
  name: "free_signup_form",
  title: "Free Tutoring Page",
  type: "document",
  icon: AddCommentIcon,
  fields: [
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
      name: "image",
      type: "image",
      options: {
        accept: ".jpg, .png, .jpeg, .gif",
      },
    }),
  ],
});
