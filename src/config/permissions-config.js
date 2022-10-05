module.exports = {
  admin: [
    {
      resource: "region",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "sector",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "object",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "category",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "user",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "work",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
  ],

  moderator: [
    {
      resource: "region",
      permissions: ["read", "readAll"],
    },
    {
      resource: "sector",
      permissions: ["read", "readAll"],
    },
    {
      resource: "object",
      permissions: ["read", "readAll"],
    },
    {
      resource: "category",
      permissions: ["read", "readAll"],
    },
    {
      resource: "work",
      permissions: ["read", "readAll", "update"],
    },
  ],
};
