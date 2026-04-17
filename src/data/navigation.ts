import type { NavigationItem } from '../types';
import { serviceCategories as servicesData } from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government/departments',
  },
  {
    label: 'Transparency',
    href: '/government/transparency-documents',
    children: [
      {
        label: 'Full Disclosure Policy',
        href: '/government/transparency-documents/full-disclosure',
      },
      {
        label: 'Transparency Documents',
        href: '/government/transparency-documents',
      },
      {
        label: 'Annual Budget',
        href: '/government/transparency-documents/annual-budget',
      },
      {
        label: 'SALN',
        href: '/government/transparency-documents/saln',
      },
      { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
    ],
  },
  {
    label: 'Statistics',
    href: '/government/reports-and-statistics',
    children: [
      {
        label: 'City Profile',
        href: '/government/reports-and-statistics/city-profile',
      },
      {
        label: 'DTI CMCI Profile',
        href: '/government/reports-and-statistics/dti-cmci-profile',
      },
      {
        label: 'Annual Report',
        href: '/government/reports-and-statistics/annual-report',
      },
      {
        label: 'Infrastracture Projects',
        href: '/government/reports-and-statistics/infrastracture-projects',
      },
      { label: 'Open Data PH', href: 'https://data.gov.ph' },
    ],
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        // { label: 'Privacy Policy', href: '/privacy' },
        // { label: 'Terms of Use', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact Us', href: '/about' },
        { label: 'Community Discord', href: '/discord' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        ...(servicesData.categories as Category[])
          .slice(0, 6)
          .map(category => ({
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        { label: 'Hotlines', href: '/philippines/hotlines' },
        { label: 'Holidays', href: '/philippines/holidays' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Open Data', href: 'https://data.gov.ph' },
        { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
        {
          label: 'Contact Center',
          href: 'https://contactcenterngbayan.gov.ph',
        },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/govph' },
    { label: 'Twitter', href: 'https://twitter.com/govph' },
    { label: 'Instagram', href: 'https://instagram.com/govph' },
    { label: 'YouTube', href: 'https://youtube.com/govph' },
  ],
};
