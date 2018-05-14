const elasticsearch = require('elasticsearch')
const config = require('config')

var client = new elasticsearch.Client({
  host: config.get('elastic.host'),
  log: 'error',
})
const shortid = require('shortid')

async function createIndex(name, option) {
  await client.indices.create({
    index: name,
    body: option,
  })
}

async function deleteIndex(index) {
  await client.indices.delete({
    index: index,
  })
}

async function insertData(index, type, users) {
  let bulk = []
  let action = { index: { _index: index, _type: type } }

  users.forEach(item => bulk.push(action, item))

  await client.bulk({
    body: bulk,
  })
}

const indexDefaultOptions = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1,
    },
  },
}

const testUsers = [{
  'userName': 'root',
  'firstName': 'სახელი',
  'lastName': 'გვარი',
  'personalId': '00000000000',
  'birthDate': '1991-01-11T00:00:00',
  'genderName': 'მამრობითი',
  'registrationDate': '2005-01-11T00:00:00', // todo es miemata, backze movagvare yvelaferi, sheidzleba frontze ramea shesacvleli armis mixedvit tu arada washale comentari
  'registrationLocationName': 'აჭარა',
  'registrationLocationUnitName': 'ბათუმი',
  'registrationAddressDescription': 'საქართველო, ქალაქი ბათუმი, პეტრე მელიქიშვილის ქუჩა, N 91, ბინა 43',
  'factLocationName': 'თბილისი',
  'factLocationUnitName': 'ისანი',
  'factAddressDescription': 'დიდი დიღომი 2 ნაბიჯთან',
  'mobileNumber': '591000000',
  'email': 'TTT@gmail.com',
  'contactDescription': 'დამატებითი საკონტაქტო ინფორმაცია ბლაბლა',
  'educations': [
    {
      'id': shortid.generate(),
      'educationType': 'უმაღლესი განათლება',
      'educationLevel': 'ბაკალავრი',
      'institution': '       გორკის    სახ. აფხაზეთის სახელმწიფო უნივერსიტეტი',
      'locationIsInGeorgia': true,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'სასწავლებელზე დამატებითი ინფორმაცია',
      'startMonth': 1,
      'startYear': 2011,
      'endMonth': 5,
      'endYear': 2015,
      'directionName': 'ბიზნესის ადმინისტრირება',
    },
  ],
  'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
  'formalEducationLevelId': '3',
  'languages': [
    {
      'languageName': 'აფხაზური',
      'languageLevel': 'არ ვფლობ',
    },
    {
      'languageName': 'ქართული',
      'languageLevel': 'თავისუფლად',
    },
  ],
  'skills': [
    {
      'skillName': 'Javascript',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3',
      ],
    },
    {
      'skillName': 'CSS',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3',
      ],
    },
  ],
  'jobExperiences': [
    {
      'id': shortid.generate(),
      'jobTitle': 'js developer',
      'organization': 'შ.პ.ს. დელფოს გრუპი',
      'description': 'სრული და ვრცეეელი  აღწერა',
      'locationIsInGeorgia': true,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'სამსახურზე დამატებითი ინფორმაცია',
      'startMonth': 1,
      'startYear': 2012,
      'endMonth': 2,
      'endYear': 2015,
      'hasDocument': true,
    },
    {
      'id': shortid.generate(),
      'jobTitle': 'მცხობელი მზარეული',
      'organization': 'შ.პ.ს. მაქს-ფუდი',
      'locationIsInGeorgia': false,
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
      'additionalAddressInfo': 'ხელიაქვს აუუფ',
      'startMonth': 1,
      'startYear': 2013,
      'endMonth': 2,
      'endYear': 2016,
      'hasDocument': false,
    },
  ],
  'hasDrivingLicence': true,
  'drivingLicenceA': true,
  'drivingLicenceB': true,
  'drivingLicenceC': true,
  'drivingLicenceD': true,
  'drivingLicenceE': true,
  'drivingLicenceT1': true,
  'drivingLicenceT2': true,
  'airLicence': true,
  'seaLicence': true,
  'railwayLicence': true,
  'militaryObligation': false,
  'desirableJobs': [
    {
      'name': 'მთავარი მზარეულები',
    },
    {
      'name': 'ფინანსთა მენეჯერები',
    },
    {
      'name': 'საინფორმაციო ტექნოლოგიის ტრენერები',
    },
    {
      'name': 'პროგრამული უზრუნველყოფის შემუშავება-განვითარების სპეციალისტები',
    },
  ],
  'desirableJobLocations': [
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი',
    },
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე',
    },
  ],
  'desirableTrainings': [
    {
      'name': 'კომპიუტერული პროგრამები და ბუღალტერია',
    },
    {
      'name': ' კულინარია, მზარეული',
    },
  ],
  'desirableTrainingLocations': [
    {
      'name': 'თბილისი',
      'unitName': 'ისანი',
    },
    {
      'name': 'თბილისი',
      'unitName': 'ვაკე',
    },
  ],
  'desirableSalary': 5000,
  'fullTime': true,
  'partTime': true,
  'shiftBased': true,
  'interestedInTraining': true, // todo wina mxares chasamatebelia fwichka
  'interestedInInternship': true,
  'interestedToBeVolunteer': true,
  'interestedInTemporaryJob': true,
  'interestedInDangerousJob': true,
  'unemployed': false,
  'useMediationService': true,
}]

const testJobs = [
  {
    'authorUserName': 'root',
    'positionName': 'JavaScript Developer',
    'organization': 'შპს FX1',
    'organizationTaxCode': '123456789',
    'locationName': 'თბილისი', //
    'locationUnitName': 'ისანი', //
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2018-01-07T00:00:00',
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'minimalSalary': 150, //
    'maximalSalary': 300, //
    'fixedSalary': null,
    'additionalSalaryInfo': 'ბონუსებით.', //
    'salaryTypeId': 1, //
    'salaryTypeName': 'საათში',
    'fullTime': true, //
    'partTime': true, //
    'shiftBased': true, //
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი', //
    'drivingLicenceA': true, //
    'drivingLicenceB': true, //
    'drivingLicenceC': true, //
    'drivingLicenceD': true, //
    'drivingLicenceE': true, //
    'drivingLicenceT1': true, //
    'drivingLicenceT2': true, //
    'airLicence': true, //
    'seaLicence': true, //
    'railwayLicence': true, //
    'languages': [ //
      {
        'languageName': 'აფხაზური',
      },
      {
        'languageName': 'ქართული',
      },
    ],
    'skills': [ //
      {
        'skillName': 'Javascript',
      },
      {
        'skillName': 'CSS',
      },
      {
        'skillName': 'Javascript1',
      },
      {
        'skillName': 'Javascript2',
      },
      {
        'skillName': 'Javascript3',
      },
      {
        'skillName': 'Javascript4',
      },
      {
        'skillName': 'Javascript5',
      },
      {
        'skillName': 'Javascript6',
      },
      {
        'skillName': 'Javascript7',
      },
      {
        'skillName': 'Javascript8',
      },
      {
        'skillName': 'Javascript9',
      },
      {
        'skillName': 'Javascript0',
      },
      {
        'skillName': 'Javascript11',
      },
      {
        'skillName': 'Javascript12',
      },
    ],
    'published': false,
  },
  {
    'authorUserName': 'root',
    'positionName': 'butler',
    'authorFullName': 'იაგო მაისურაძე',
    'authorPersonalId': '01234567890',
    'locationName': 'თბილისი',
    'locationUnitName': 'ისანი',
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2018-01-07T00:00:00',
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'minimalSalary': null, //
    'maximalSalary': null, //
    'fixedSalary': null,
    'additionalSalaryInfo': 'გამომუშავებით', //
    'fullTime': true,
    'partTime': true,
    'shiftBased': true,
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
    'drivingLicenceA': true,
    'drivingLicenceB': true,
    'drivingLicenceC': true,
    'drivingLicenceD': true,
    'drivingLicenceE': true,
    'drivingLicenceT1': true,
    'drivingLicenceT2': true,
    'airLicence': true,
    'seaLicence': true,
    'railwayLicence': true,
    'languages': [{ 'languageName': 'აფხაზური' }],
    'skills': [{ 'skillName': 'Javascript' }],
    'published': false,
  },
  {
    'authorUserName': 'root',
    'positionName': 'bounty hunter',
    'organization': 'შპს organization 2',
    'organizationTaxCode': '222222222',
    'locationName': 'თბილისი',
    'locationUnitName': 'ისანი',
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2018-01-07T00:00:00',
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'minimalSalary': null, //
    'maximalSalary': null, //
    'fixedSalary': 1500,
    'additionalSalaryInfo': 'ბონუსებით.', //
    'salaryTypeId': 2, //
    'salaryTypeName': 'თვეში',
    'fullTime': true,
    'partTime': true,
    'shiftBased': true,
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
    'drivingLicenceA': true,
    'drivingLicenceB': true,
    'drivingLicenceC': true,
    'drivingLicenceD': true,
    'drivingLicenceE': true,
    'drivingLicenceT1': true,
    'drivingLicenceT2': true,
    'airLicence': true,
    'seaLicence': true,
    'railwayLicence': true,
    'languages': [{ 'languageName': 'აფხაზური' }],
    'skills': [{ 'skillName': 'Javascript' }],
    'published': true,
  },
  {
    'authorUserName': 'root',
    'positionName': 'chef',
    'organization': 'შპს organization 3',
    'organizationTaxCode': '333333333',
    'locationName': 'თბილისი',
    'locationUnitName': 'ისანი',
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2006-01-07T00:00:00',
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'minimalSalary': null, //
    'maximalSalary': null, //
    'additionalSalaryInfo': 'შეთანხმებით', //
    'salaryTypeId': null, //
    'salaryTypeName': null,
    'fullTime': true,
    'partTime': true,
    'shiftBased': true,
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
    'drivingLicenceA': true,
    'drivingLicenceB': true,
    'drivingLicenceC': true,
    'drivingLicenceD': true,
    'drivingLicenceE': true,
    'drivingLicenceT1': true,
    'drivingLicenceT2': true,
    'airLicence': true,
    'seaLicence': true,
    'railwayLicence': true,
    'languages': [{ 'languageName': 'აფხაზური' }],
    'skills': [{ 'skillName': 'Javascript' }],
    'published': true,
  },
  {
    'authorUserName': 'root',
    'positionName': 'chef',
    'organization': 'შპს organization 3',
    'organizationTaxCode': '333333333',
    'locationName': 'თბილისი',
    'locationUnitName': 'ისანი',
    'addressLine': 'დამატებითი მისამართი',
    'publishDate': '2017-12-03T00:00:00',
    'interviewSupposedStartDate': '2018-01-01T00:00:00',
    'endDate': '2006-01-07T00:00:00',
    'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
    'useMediationService': true,
    'vacantPlacesQuantity': 2,
    'functionsDescription': 'bl abl abl ab la wa wr rwq qw rw rwq r wq r',
    'additionalDescription': 'damatebiti informacia TEST TEST',
    'minimalSalary': null, //
    'maximalSalary': null, //
    'fixedSalary': 150000,
    'additionalSalaryInfo': '', //
    'salaryTypeId': 3, //
    'salaryTypeName': 'წელიწადში',
    'fullTime': true,
    'partTime': true,
    'shiftBased': true,
    'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
    'drivingLicenceA': true,
    'drivingLicenceB': true,
    'drivingLicenceC': true,
    'drivingLicenceD': true,
    'drivingLicenceE': true,
    'drivingLicenceT1': true,
    'drivingLicenceT2': true,
    'airLicence': true,
    'seaLicence': true,
    'railwayLicence': true,
    'languages': [{ 'languageName': 'აფხაზური' }],
    'skills': [{ 'skillName': 'Javascript' }],
    'published': true,
  },
]

const testLibs = [{
  locationsInGeorgia: [
    {
      locationName: 'თბილისი',
      units: [
        { locationUnitName: 'ვაკე' },
        { locationUnitName: 'ისანი' },
        { locationUnitName: 'კრწანისი' },
        { locationUnitName: 'მთაწმინდა' },
        { locationUnitName: 'გლდანი' },
        { locationUnitName: 'დიდუბე' },
        { locationUnitName: 'ნაძალადევი' },
        { locationUnitName: 'ჩუღურეთი' },
        { locationUnitName: 'საბურთალო' },
        { locationUnitName: 'სამგორი' },
      ],
    },
    {
      locationName: 'გურია',
      units: [
        { locationUnitName: 'ოზურგეთი' },
        { locationUnitName: 'ლანჩხუთი' },
        { locationUnitName: 'ჩოხატაური' },
      ],
    },
    {
      locationName: 'რაჭა-ლეჩხუმი & ქვემო სვანეთი',
      units: [
        { locationUnitName: 'ამბროლაური' },
        { locationUnitName: 'ლენტეხი' },
        { locationUnitName: 'ონი' },
        { locationUnitName: 'ცაგერი' },
      ],
    },
    {
      locationName: 'კახეთი',
      units: [
        { locationUnitName: 'ახმეტა' },
        { locationUnitName: 'გურჯაანი' },
        { locationUnitName: 'დედოფლის წყარო' },
        { locationUnitName: 'თელავი' },
        { locationUnitName: 'ლაგოდეხი' },
        { locationUnitName: 'საგარეჯო' },
        { locationUnitName: 'სიღნაღი' },
        { locationUnitName: 'ყვარლი' },
      ],
    },
    {
      locationName: 'იმერეთი',
      units: [
        { locationUnitName: 'ბაღდათი' },
        { locationUnitName: 'ვანი' },
        { locationUnitName: 'ზესტაფონი' },
        { locationUnitName: 'თერჯოლა' },
        { locationUnitName: 'სამტრედია' },
        { locationUnitName: 'საჩხერე' },
        { locationUnitName: 'ტყიბული' },
        { locationUnitName: 'ქუთაისი' },
        { locationUnitName: 'წყალტუბო' },
        { locationUnitName: 'ჭიათურა' },
        { locationUnitName: 'ხარაგაული' },
        { locationUnitName: 'ხონი' },
      ],
    },
    {
      locationName: 'მცხეთა-მთიანეთი  ',
      units: [
        { locationUnitName: 'ახალგორი' },
        { locationUnitName: 'დუშეთი' },
        { locationUnitName: 'თიანეთი' },
        { locationUnitName: 'მცხეთა' },
        { locationUnitName: 'ყაზბეგი' },
      ],
    },
    {
      locationName: 'სამეგრელო-ზემო სვანეთი',
      units: [
        { locationUnitName: 'აბაშა' },
        { locationUnitName: 'ზუგდიდი' },
        { locationUnitName: 'მარტვილი' },
        { locationUnitName: 'მესტია' },
        { locationUnitName: 'სენაკი' },
        { locationUnitName: 'ფოთი' },
        { locationUnitName: 'ჩხოროწყუ' },
        { locationUnitName: 'წალენჯიხა' },
        { locationUnitName: 'ხობი' },
      ],
    },
    {
      locationName: 'სამცხე-ჯავახეთი',
      units: [
        { locationUnitName: 'ადიგენი' },
        { locationUnitName: 'ასპინძა' },
        { locationUnitName: 'ახალქალაქი' },
        { locationUnitName: 'ახალციხე' },
        { locationUnitName: 'ბორჯომი' },
        { locationUnitName: 'ნინოწმინდა' },
      ],
    },
    {
      locationName: 'ქვემო ქართლი ',
      units: [
        { locationUnitName: 'ბოლნისი' },
        { locationUnitName: 'გარდაბნი' },
        { locationUnitName: 'დმანისი' },
        { locationUnitName: 'თეთრი წყარო' },
        { locationUnitName: 'მარნეული' },
        { locationUnitName: 'რუსთავი' },
        { locationUnitName: 'წალკის' },
      ],
    },
    {
      locationName: 'შიდა ქართლი ',
      units: [
        { locationUnitName: 'გორი' },
        { locationUnitName: 'კასპი' },
        { locationUnitName: 'ქარელი' },
        { locationUnitName: 'ხაშური' },
      ],
    },
    {
      locationName: 'აჭარის ავტონომიური რესპუბლიკა',
      units: [
        { locationUnitName: 'ბათუმი' },
        { locationUnitName: 'ქედა' },
        { locationUnitName: 'ქობულეთი' },
        { locationUnitName: 'შუახევი' },
        { locationUnitName: 'ხელვაჩაური' },
        { locationUnitName: 'ხულო' },
      ],
    },
    {
      locationName: 'აფხაზეთი',
      units: [
        { locationUnitName: 'გაგრა' },
        { locationUnitName: 'გუდაუთა' },
        { locationUnitName: 'სოხუმი' },
        { locationUnitName: 'გულრიფში' },
        { locationUnitName: 'ოჩამჩირე' },
        { locationUnitName: 'გალი' },
        { locationUnitName: 'ტყვარჩელი' },
      ],
    },
  ],
}]

const testLanguages = [
  { name: 'ქართული' },
  { name: 'ინგლისური' },
  { name: 'რუსული' },
  { name: 'ფრანგული' },
  { name: 'გერმანული' },
  { name: 'ესპანური' },
  { name: 'არაბული' },
  { name: 'აფხაზური' },
]

const testEducationTypes = [
  { name: 'უმაღლესი განათლება' },
  { name: 'პროფესიული განათლება' },
  { name: 'ტრენინგები' },
  { name: 'არაფორმალური განათლება' },
]

const testEducationLevels = [
  { name: 'ბაკალავრი' },
  { name: 'მაგისტრი' },
  { name: 'მაგისტრთან გათანაბრებული' },
  { name: 'დოქტორი' },
]

const testFormalEducationLevels = [
  { name: 'უმაღლესი - ბაკალავრი' },
  { name: 'უმაღლესი - მაგისტრი' },
  { name: 'უმაღლესი - მაგისტრთან გათანაბრებული' },
  { name: 'უმაღლესი - დოქტორანტურა' },
  { name: 'უმაღლესი (დაუსრულებელი)' },
  { name: 'უმაღლესი საგანმანათლებლო დაწესებულების სტუდენტი' },
  { name: 'პროფესიული საგანმანათლებლო დაწესებულების სტუდენტი' },
  { name: 'საშუალო, ტექნიკური ან პროფესიული განათლება' },
  { name: 'საშუალო სკოლა (დასრულებული)' },
  { name: 'საშუალო სკოლა (დაუსრულებელი)' },
  { name: 'დაწყებითი განათლება' },
]

const testSkills = [
  { name: 'Auditing' },
  { name: 'AutoCAD' },
  { name: 'Automotive' },
  { name: 'Art' },
  { name: 'Analytical Skills' },
  { name: 'Adobe Photoshop' },
  { name: 'Art Direction' },
  { name: 'Automation' },
  { name: 'Adobe Illustrator' },
  { name: 'Agile Methodologies' },
  { name: 'Business Analysis' },
  { name: 'Budgeting' },
  { name: 'Business Strategy' },
  { name: 'Business Process Improvement' },
  { name: 'Business Services' },
  { name: 'Business Planning' },
  { name: 'Branding' },
  { name: 'Business-to-Business (B2B)' },
  { name: 'Business Intelligence' },
  { name: 'Business Process' },
  { name: 'Customer Service' },
  { name: 'Communication' },
  { name: 'Company Research' },
  { name: 'Change Management' },
  { name: 'Coaching' },
  { name: 'Construction' },
  { name: 'Customer Relationship Management (CRM)' },
  { name: 'Contractual Agreements' },
  { name: 'Customer Satisfaction' },
  { name: 'Contract Negotiation' },
  { name: 'Design' },
  { name: 'Databases' },
  { name: 'Data Analysis' },
  { name: 'Digital Marketing' },
  { name: 'DES' },
  { name: 'Decision-Making' },
  { name: 'Digital Media' },
  { name: 'Drawing' },
  { name: 'DOS' },
  { name: 'Development Tools' },
  { name: 'Event Planning' },
  { name: 'Editing' },
  { name: 'Entrepreneurship' },
  { name: 'Email' },
  { name: 'Employee Benefits Design' },
  { name: 'Energy' },
  { name: 'Electronics' },
  { name: 'Enterprise Software' },
  { name: 'E-commerce' },
  { name: 'Javascript' },
  { name: 'CSS' },
  { name: 'HTML' },
  { name: 'oop' },
]

const testDesirableJobs = [
  { name: 'Plumber' },
  { name: 'Electrical Engineer' },
  { name: 'Merchant' },
  { name: 'Housekeeper' },
  { name: 'Lion Tamer' },
  { name: 'Web Developer' },
  { name: 'მთავარი მზარეულები' },
  { name: 'ფინანსთა მენეჯერები' },
  { name: 'საინფორმაციო ტექნოლოგიის ტრენერები' },
  { name: 'პროგრამული უზრუნველყოფის შემუშავება-განვითარების სპეციალისტები' },
]

const testDesirableTrainings = [
  { name: 'training 1' },
  { name: 'training 2' },
  { name: 'training 3' },
  { name: 'კომპიუტერული პროგრამები და ბუღალტერია' },
  { name: ' კულინარია, მზარეული' },
]

const salaryTypes = [
  {typeId: 1, typeName: 'საათში'},
  {typeId: 2, typeName: 'თვეში'},
  {typeId: 3, typeName: 'წელიწადში'},
]

async function seedData(data, index, indexOption, type, dropIndexIfExists = false) {
  let exists = await client.indices.exists({ index: index })

  if (exists) {
    if (dropIndexIfExists) {
      await deleteIndex(index)

      await createIndex(index, indexOption)

      await insertData(index, type, data)
    }
  } else {
    await createIndex(index, indexOption)

    await insertData(index, type, data)
  }
}

async function seedAllData(dropAll = false) {
  try {
    await Promise.all([
      seedData(testUsers, 'user', indexDefaultOptions, 'user', dropAll || false),
      seedData(testJobs, 'vacancy', indexDefaultOptions, 'vacancy', dropAll || false),
      seedData(testLibs, 'location', indexDefaultOptions, 'location', dropAll || true),
      seedData(testEducationTypes, 'educationtype', indexDefaultOptions, 'educationtype', dropAll || true),
      seedData(testEducationLevels, 'educationlevel', indexDefaultOptions, 'educationlevel', dropAll || true),
      seedData(testFormalEducationLevels, 'formaleducationlevel', indexDefaultOptions, 'formaleducationlevel', dropAll || true),
      seedData(testSkills, 'skill', indexDefaultOptions, 'skill', dropAll || false),
      seedData(testDesirableJobs, 'desirablejob', indexDefaultOptions, 'desirablejob', dropAll || false),
      seedData(testDesirableTrainings, 'desirabletraining', indexDefaultOptions, 'desirabletraining', dropAll || false),
      seedData(testLanguages, 'languages', indexDefaultOptions, 'languages', dropAll || false),
      seedData(salaryTypes, 'salarytypes', indexDefaultOptions, 'salarytypes', dropAll || true),
    ])

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

let dropOption = process.argv[2] === '--drop'

seedAllData(dropOption)
