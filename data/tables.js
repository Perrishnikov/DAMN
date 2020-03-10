const TYPE = {
  LABEL: 'LABEL',
  CARTON: 'CARTON',
  POUCH: 'POUCH'
};

const LABEL_GROUP_STATUS = {
  ACTIVE: 'ACTIVE',
  HISTORY: 'HISTORY'
};

export const PREFIXES = new Map([
  ['LE', {
    name: 'LE',
    desc: 'Enzymatic core design',
    type: TYPE.LABEL
  }],
  ['LG', {
    name: 'LG',
    desc: ' new design/graphic update',
    type: TYPE.LABEL
  }],
  ['LBX', {
    name: 'LBX',
    desc: 'Enzymatic Therapy older design box',
    type: TYPE.CARTON
  }],
  ['LBN', {
    name: 'LBN',
    desc: 'Nature’s way box',
    type: TYPE.CARTON
  }],
  ['LGPK', {
    name: 'LGPK',
    desc: 'Pouch',
    type: TYPE.POUCH
  }]
]);

/**
 * Table - Partcodes
 */
export const partcodes = new Map([
  ['12434', '12434'],
  ['00039', '00039'],
  ['13269', '13269'],
]);


/**
 * Table - Labels
 */
export const labels = new Map([
  [
    'empty', {
      prefix: '',
      partcode: '',
      version: '',
      bulk: '',
      country: '',
      oto: 'boolean',
      context: '',
      extension: '',
      name: '',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    },
  ], [
    'LG00039.A03', {
      prefix: PREFIXES.get('LG'),
      partcode: partcodes.get('00039'),
      bulk: null,
      country: '',
      version: 'A03',
      context: 'Label - Dr Choice Women 90 tabs (G)',
      extension: 'pdf',
      name: 'LG00039.A03 Dr Choice Women 90 tabs (G).pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ], [
    'LBX00039.N03', {
      prefix: PREFIXES.get('LBX'),
      partcode: partcodes.get('00039'),
      bulk: null,
      country: '',
      version: 'N03',
      context: 'Dr Choice Women 90 tabs (G)',
      extension: 'pdf',
      name: 'LBX00039.N03 Dr Choice Women 90 tabs (G).pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ], [
    'LBX00039.N02', {
      prefix: PREFIXES.get('LBX'),
      partcode: partcodes.get('00039'),
      bulk: null,
      country: '',
      version: 'N02',
      context: 'Dr Choice Manly 90 tabs (G)',
      extension: 'pdf',
      name: 'LBX00039.N02 This is the name.pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ], [
    'LBN00039.N01', {
      prefix: PREFIXES.get('LBN'),
      partcode: partcodes.get('00039'),
      bulk: null,
      country: '',
      version: 'N01',
      context: 'This is the name',
      extension: 'pdf',
      name: 'LBN00039.N01 This is the name.pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ],
  [
    'LBN12434.V02', {
      prefix: PREFIXES.get('LBN'),
      partcode: partcodes.get('12434'),
      bulk: null,
      country: '',
      version: 'V02',
      context: 'Hemp',
      name: 'This is the name of 12434',
      extension: 'pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ]
]);

const images = new Map([
  ['00039', '00039.MAIN.01.jpg']
]);

/** 
 * Groups
 */
export const labelGroups = new Map([
  ['12434', [{
    // partcode: partcodes.get('12434'),
    date: '',
    labels: []
  }]],
  ['00039', [
    {
      // partcode: partcodes.get('00039'),
      date: '',
      groupName: 'LG0003',
      status: LABEL_GROUP_STATUS.ACTIVE,
      labels: [
        labels.get('LBX00039.N03'),
        labels.get('LG00039.A03')
      ]
    }, {
      // partcode: partcodes.get('00039'),
      date: '',
      groupName: 'LG0002',
      comment: '',
      status: LABEL_GROUP_STATUS.HISTORY,
      labels: [
        labels.get('LBX00039.N02')
      ],
      images: [
        images.get('00039.MAIN.01.jpg')
      ]
    }, {
      // partcode: partcodes.get('00039'),
      date: '',
      groupName: 'LG0001',
      status: LABEL_GROUP_STATUS.HISTORY,
      labels: [
        labels.get('LBN00039.N01')
      ]
    }
  ]],
]);



