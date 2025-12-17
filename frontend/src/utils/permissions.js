export const canUseFeature = (user, feature) => {
  if (!user) return false;

  const role = user.role;

  const permissions = {
    free: ["basic_chat"],
    premium: ["basic_chat", "doc_analysis", "research"],
    enterprise: ["basic_chat", "doc_analysis", "research", "bulk_upload"],
  };

  return permissions[role]?.includes(feature);
};
