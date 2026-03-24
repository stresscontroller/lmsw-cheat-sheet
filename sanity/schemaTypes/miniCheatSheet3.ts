import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentSheetIcon, ComposeSparklesIcon, ImageIcon, InlineIcon } from '@sanity/icons'

export const MiniCheatSheet3Type = defineType({
  name: "minicheatsheet3",
  title: "3) DSM Diagnostic Circle: Full Series (Parts 1–3)",
  type: "document",
  icon: DocumentSheetIcon,
  fields: [
    defineField({
      name: "pageNumber",
      title: "Page Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "runningHead",
      title: "Running Head",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Heading 6", value: "h6" },
          ],
          lists: [],
          marks: {
            // decorators: [],
            annotations: [
              {
                name: "customClass",
                title: "Custom Class (tailwind)",
                type: "object",
                icon: ComposeSparklesIcon,
                fields: [
                  {
                    title: "Class Name",
                    name: "className",
                    type: "string",
                  },
                ],
              },
              {
                title: "Link",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          icon: ImageIcon,
          fields: [
            {
              name: "altText",
              title: "Alt Text",
              type: "string",
              description: "Set the alternative text for the image",
            },
            {
              name: "className",
              title: "Custom Class (Tailwind)",
              type: "string",
              description: "Add Tailwind or custom utility classes (e.g. 'bg-blue-100 text-center py-4')",
            },
          ],
        },
        {
          type: "object",
          name: "section",
          title: "Section",
          icon: InlineIcon,
          fields: [
            {
              name: "className",
              title: "Custom Class (Tailwind)",
              type: "string",
              description: "Add Tailwind or custom utility classes (e.g. 'bg-blue-100 text-center py-4')",
            },
            {
              name: "html",
              title: "Raw HTML",
              type: "text",
              rows: 8,
              description: "You can enter custom HTML here. Use carefully.",
            },
            {
              name: "assets",
              title: "Image Assets (for HTML)",
              type: "array",
              of: [{ type: "image" }],
              description: "Upload images you want to use in the raw HTML field below"
            },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "Heading 1", value: "h1" },
                    { title: "Heading 2", value: "h2" },
                    { title: "Heading 3", value: "h3" },
                    { title: "Heading 4", value: "h4" },
                    { title: "Heading 5", value: "h5" },
                    { title: "Heading 6", value: "h6" },
                  ],
                  lists: [],
                  marks: {
                    annotations: [
                      {
                        name: "customClass",
                        title: "Custom Class (tailwind)",
                        type: "object",
                        icon: ComposeSparklesIcon,
                        fields: [
                          {
                            title: "Class Name",
                            name: "className",
                            type: "string",
                          },
                        ],
                      },
                      {
                        title: "Link",
                        name: "link",
                        type: "object",
                        fields: [
                          {
                            title: "URL",
                            name: "href",
                            type: "url",
                            validation: (Rule) =>
                              Rule.uri({
                                scheme: ["http", "https", "mailto", "tel"],
                              }),
                          },
                          {
                            title: "Open in new tab",
                            name: "blank",
                            type: "boolean",
                            initialValue: false,
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  type: "image",
                  icon: ImageIcon,
                  fields: [
                    {
                      name: "altText",
                      title: "Alt Text",
                      type: "string",
                      description: "Set the alternative text for the image",
                    },
                    {
                      name: "className",
                      title: "Custom Class (Tailwind)",
                      type: "string",
                      description: "Add Tailwind or custom utility classes (e.g. 'bg-blue-100 text-center py-4')",
                    },
                  ],
                },
              ],
              description: "Content inside the section",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "answerList",
      title: "Quiz Answers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "order",
              type: "number",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reason",
              type: "string",
            }),
            defineField({
              name: "isRight",
              type: "boolean",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      pageNumber: "pageNumber",
    },
    prepare(selection) {
      const { pageNumber } = selection;
      return {
        title: `Page ${pageNumber}`,
        // subtitle: `Page Number: ${pageNumber}`,
      };
    },
  },
  orderings: [
    {
      title: "Page Number Ascending",
      name: "pageNumberAsc",
      by: [{ field: "pageNumber", direction: "asc" }],
    },
  ],
});
