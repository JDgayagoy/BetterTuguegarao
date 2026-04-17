// Hospital data for Tuguegarao City, Cagayan
// Coordinates verified against OpenStreetMap (Nominatim search).
// Phone numbers from official directories and the document source.

export interface Hospital {
  name: string;
  type: string;
  position: [number, number];
  address?: string;
  phones?: string[];
}

export const HOSPITALS: Hospital[] = [
  {
    name: 'Cagayan Valley Medical Center (CVMC)',
    type: 'Government · Tertiary',
    position: [17.6569, 121.7468],
    address: 'Dalan na Pagayaya, Carig Sur, Tuguegarao City',
    phones: ['(078) 302-0000'],
  },
  {
    name: 'St. Paul Hospital of Tuguegarao',
    type: 'Private · Tertiary',
    position: [17.6141, 121.7075],
    address: 'Luna St. Ext., Ugac Norte, Tuguegarao City',
    phones: ['(078) 844-2512', '(078) 844-2520'],
  },
  {
    name: 'ACE Medical Center Tuguegarao',
    type: 'Private · Tertiary',
    position: [17.6199, 121.7071],
    address: 'Pallua Road, Pallua Sur, Tuguegarao City',
    phones: [],
  },
  {
    name: "Tuguegarao City People's General Hospital",
    type: 'Government · City',
    position: [17.6129, 121.7295],
    address: 'Luna St., Centro 6, Tuguegarao City, Cagayan',
    phones: [],
  },
  {
    name: 'Cagayan United Doctors Medical Center (CUDMC)',
    type: 'Private · Hospital',
    position: [17.624, 121.7213],
    address: '7 Bagay Road, Tuguegarao City',
    phones: ['0917 189 1898'],
  },
  {
    name: 'Divine Mercy Wellness Center',
    type: 'Private · Medical Center',
    position: [17.6114, 121.7272],
    address: '3500, 47 Arellano St, Tuguegarao City',
    phones: ['0906 886 0092'],
  },
  {
    name: 'Raphael General Hospital',
    type: 'Private · Hospital',
    position: [17.6333, 121.7127],
    address: 'Barangay, Bagay Road, Tuguegarao City',
    phones: ['0908 223 9808'],
  },
  {
    name: 'Ronald P. Guzman Medical Center',
    type: 'Private · Hospital',
    position: [17.6488, 121.7556],
    address: 'Tuguegarao City',
    phones: ['(078) 304 0925'],
  },
  {
    name: 'Holy Infant Hospital',
    type: 'Private · Hospital',
    position: [17.6157, 121.7261],
    address: '50 Washington St, Tuguegarao City',
    phones: ['(078) 844 1039'],
  },
  {
    name: 'Dr. Domingo S. De Leon General Hospital',
    type: 'Private · Hospital',
    position: [17.6102, 121.7283],
    address: '141-A Bonifacio St, Tuguegarao City',
    phones: ['8440013'],
  },
];

export interface UnmappedHospital {
  name: string;
  type: string;
  phones: string[];
}

export const UNMAPPED_HOSPITALS: UnmappedHospital[] = [];
