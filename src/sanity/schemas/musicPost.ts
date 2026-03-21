import { defineType, defineField } from "sanity";

export default defineType({
  name: "musicPost",
  title: "Music Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Video", value: "video" },
          { title: "Image", value: "image" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      description:
        "Optional — link to the Instagram reel/post for any content type",
    }),
    defineField({
      name: "media",
      title: "Video File",
      type: "file",
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Preview image for videos and Instagram posts",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium (Tall)", value: "medium" },
          { title: "Large (Featured)", value: "large" },
        ],
      },
      validation: (rule) => rule.required(),
      initialValue: "small",
    }),
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderRank",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "thumbnail" },
  },
});
