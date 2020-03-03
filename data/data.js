const TYPE = {
  LABEL: 'LABEL',
  CARTON: 'CARTON',
  POUCH: 'POUCH'
};

const PREFIX = {
  LE: {
    name: 'LE',
    desc: 'Enzymatic core design',
    type: TYPE.LABEL
  },
  LBX: {
    name: 'LBX',
    desc: 'Enzymatic Therapy older design box',
    type: TYPE.CARTON
  }
};

export const partcodes = new Map([
  ['12434', '12434'],
  ['00039', '00039'],
  ['13269', '13269'],
]);

export const labels = new Map([
  [
    'tester', {
      prefix: '',
      partcode: '',
      version: '',
      bulk: '',
      country: '',
      context: '',
      extension: '',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    },
  ], [
    '00039', {
      prefix: PREFIX.LBX,
      partcode: partcodes['00039'],
      bulk: null,
      version: 'N03',
      context: 'Dr Choice Women 90 tabs (G)',
      extension: 'pdf',
      meta: {
        date_created: ''
      }
    }
  ], [
    '00039', {
      prefix: PREFIX.LBX,
      partcode: partcodes['00039'],
      bulk: null,
      version: 'N02',
      context: 'Dr Choice Manly 90 tabs (G)',
      extension: 'pdf',
      meta: {
        date_created: ''
      }
    }
  ]
]);


