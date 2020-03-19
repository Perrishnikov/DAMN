const TYPE = {
  LABEL: 'LABEL',
  CARTON: 'CARTON',
  POUCH: 'POUCH'
};

const LABEL_GROUP_STATUS = {
  ACTIVE: 'ACTIVE',
  HISTORY: 'HISTORY',
  PENDING: 'PENDING', //label created group - its approved
  REJECTED: 'REJECTED' //kicked back from someone (image team)
};

// class LG_Status{
//   currentStatus = '';
//   lastStatus = '';
//   dateCreated = '';
//   dateUpdated = '';
//   lastUpdatedBy = '';
// } 

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
  ['00039C', '00039C'],
  ['13269', '13269'],
]);


/**
 * Table - Labels
 */
export const labels = new Map([
  [
    'empty', {
      prefix: '',
      partcode: 'blah',
      version: '',
      bulk: '',
      country: '',
      oto: 'boolean',
      description: '',
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
      description: 'Label - Dr Choice Women 90 tabs (G)',
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
      description: 'Dr Choice Women 90 tabs (G)',
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
      description: 'Dr Choice Manly 90 tabs (G)',
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
      description: 'This is the name',
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
  ], [
    'LBN00039C.A', {
      prefix: PREFIXES.get('LBN'),
      partcode: partcodes.get('00039C'),
      bulk: null,
      country: '',
      version: 'A',
      description: '"C" version of 00039',
      extension: 'pdf',
      name: 'LBN00039C.A This is the name.pdf',
      meta: {
        META_LABEL_ASSET_TYPE: '', // LABEL, CARTON, BLISTER
        META_LABEL_UPDATED_DATE: '', // from file properties
        META_LABEL_CREATED_BY: '', // from file properties
        LABEL_PDF_PENDING: '',
        LABEL_PDF_ACTIVE: '',
      }
    }
  ], [
    'LBN12434.V02', {
      prefix: PREFIXES.get('LBN'),
      partcode: partcodes.get('12434'),
      bulk: null,
      country: '',
      version: 'V02',
      description: 'Hemp',
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

export const images = new Map([
  ['00039', [{
    name: '00039.MAIN.01.jpg',
    dateAdded: '',
    bucket: 'MAIN',
    partcode: partcodes.get('00039'),
    number: '01',
    extension: 'jpg',
    user: '',
    meta: {
      misc: ''
    }
  }, {
    name: '00039.MAIN.02.jpg',
    dateAdded: '',
    bucket: 'MAIN',
    partcode: partcodes.get('00039'),
    number: '02',
    extension: 'jpg',
    user: '',
    meta: {
      misc: ''
    }
  },]],
  ['12434', [{
    name: '12434.FACTS.01.jpg',
    dateAdded: '',
    bucket: 'FACTS',
    partcode: partcodes.get('12434'),
    number: '01',
    extension: 'jpg',
    user: '',
    meta: {
      misc: ''
    }
  }]]
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
      date: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
      groupName: 'LG0005',
      description: 'This was a fine label update. So much to do and so little time.',
      user: 'Joe Employee',
      status: LABEL_GROUP_STATUS.PENDING,
      statusDate: '2020-10-03',
      labelDate: '2020-10-03',
      labelPerson: 'Joe Employee',
      imageDate: '',
      imagePerson: '',
      labels: [
        labels.get('LBX00039.N03'),
        labels.get('LG00039.A03')
      ]
    },
    {
      // partcode: partcodes.get('00039'),
      date: '',
      groupName: 'LG0003',
      description: '',
      status: LABEL_GROUP_STATUS.ACTIVE,
      statusDate: '2020-11-03',
      labelDate: '2020-10-03',
      labelPerson: 'Joe Employee',
      imageDate: '2020-10-03',
      imagePerson: 'Jane Employee',
      labels: [
        labels.get('LBX00039.N03'),
        labels.get('LG00039.A03')
      ]
    }, {
      // partcode: partcodes.get('00039'),
      date: '',
      groupName: 'LG0002',
      description: '',
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
      description: '',
      status: LABEL_GROUP_STATUS.HISTORY,
      labels: [
        labels.get('LBN00039.N01')
      ]
    }
  ]],
]);

export class LabelGroup {
  constructor(params) {
    const { newGroupName, newLabels, date, user, description } = params;

    this.date = date;
    this.user = user;
    this.description = description;
    this.groupName = newGroupName;
    this.status = LABEL_GROUP_STATUS.PENDING;
    this.statusDate = date;
    this.labelDate = '';
    this.labelPerson = 'Logged In User';
    this.imageDate = '';
    this.imagePerson = '';
    this.labels = newLabels;
    this.images = '';
  }

  images = '';

}

