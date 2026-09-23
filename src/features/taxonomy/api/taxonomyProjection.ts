export const taxonomyProjection = `
  category-> {
    _id,
    title,
    "slug": slug.current,
    displayOrder
  },

  "tags": coalesce(
    tags[]-> {
      _id,
      title,
      "slug": slug.current,

      category-> {
        _id,
        title,
        "slug": slug.current,
        displayOrder
      }
    },
    []
  )
`;
