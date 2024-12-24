export const hasPagePermission = (userPermissions, requiredPermission) => {
  return userPermissions.pages.includes(requiredPermission);
};

export const hasActionPermission = (userPermissions, resource, action) => {
  return userPermissions.actions[resource]?.includes(action);
};
