import { defineField, defineType } from "sanity";
import {LockIcon} from '@sanity/icons'

export const LogInPageType = defineType({
  name: "signin_page",
  title: "Log In Page",
  type: "document",
  icon: LockIcon,
  fields: [
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
});
