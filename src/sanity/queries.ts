export const experienceQuery = `*[_type == "experience"] | order(startDate desc) { ..., "companyLogoUrl": companyLogo.asset->url }`;
export const projectsQuery = `*[_type == "project"] | order(date desc)`;
export const skillsQuery = `*[_type == "skillCategory"] | order(orderRank asc)`;
export const achievementsQuery = `*[_type == "achievement"]`;
export const educationQuery = `*[_type == "education"]`;
export const personalTilesQuery = `*[_type == "personalTile"] | order(orderRank asc)`;
export const socialsQuery = `*[_type == "socialLink"] | order(orderRank asc)`;
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;
