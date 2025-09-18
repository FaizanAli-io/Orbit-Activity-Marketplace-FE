enum NavLinkType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  BOTH = 'both',
}

export const data = [
  { text: 'Events Hub', href: '/explore', type: NavLinkType.PUBLIC },
  { text: 'Events Hub', href: '/profile/events', type: NavLinkType.PRIVATE },
  { text: 'Privacy & Policy', href: '/privacy-policy', type: NavLinkType.BOTH },
];

export const publicLinks = data.filter(
  d => d.type === NavLinkType.PUBLIC || d.type === NavLinkType.BOTH
);

export const privateLinks = data.filter(
  d => d.type === NavLinkType.PRIVATE || d.type === NavLinkType.BOTH
);
