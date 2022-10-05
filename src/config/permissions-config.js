module.exports = {
  admin: [
    {
      resource: "category",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "department",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "order",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "organization",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "rank",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "room",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "user",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
  ],

  organization: [
    {
      resource: "category",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "department",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "order",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "organization",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "rank",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "room",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
    {
      resource: "user",
      permissions: ["read", "readAll", "create", "update", "delete"],
    },
  ],
};
