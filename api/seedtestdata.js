var elasticsearch = require('elasticsearch')
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
})
const shortid = require('shortid')

async function createIndex(name, option) {
  await client.indices.create({
    index: name,
    body: option
  })
}

async function deleteIndex(index) {
  await client.indices.delete({
    index: index
  })
}

async function insertData(index, type, users) {
  let bulk = []
  let action = { index: { _index: index, _type: type } }

  users.forEach(item => bulk.push(action, item))

  await client.bulk({
    body: bulk
  })
}

const indexDefaultOptions = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}
const userIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}
const jobIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}
const libIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}

const skillIndex = {
  'settings': {
    'index': {
      'number_of_shards': 1,
      'number_of_replicas': 1
    }
  }
}

const testUsers = [{
  'userName': 'test',
  'firstName': 'სახელი',
  'lastName': 'გვარი',
  'personalId': '00000000000',
  'birthDate': '1991-01-11T00:00:00',
  'genderName': 'მამრობითი',
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
      'directionName': 'ბიზნესის ადმინისტრირება'
    }
  ],
  'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
  'formalEducationLevelId': '3',
  'languages': [
    {
      'languageName': 'აფხაზური',
      'languageLevel': 'არ ვფლობ'
    },
    {
      'languageName': 'ქართული',
      'languageLevel': 'თავისუფლად'
    }
  ],
  'skills': [
    {
      'skillName': 'Javascript',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3'
      ]
    },
    {
      'skillName': 'CSS',
      'endorsements': 0,
      'users': [
        'user_id1',
        'user_id2',
        'user_id3'
      ]
    }
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
      'hasDocument': true
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
      'hasDocument': false
    }
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
      'name': 'მთავარი მზარეულები '
    },
    {
      'name': 'ფინანსთა მენეჯერები'
    },
    {
      'name': 'საინფორმაციო ტექნოლოგიის ტრენერები'
    },
    {
      'name': 'პროგრამული უზრუნველყოფის შემუშავება-განვითარების სპეციალისტები'
    }
  ],
  'desirableJobLocations': [
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ისანი'
    },
    {
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    }
  ],
  'desirableTrainings': [
    {
      'trainigName': 'კომპიუტერული პროგრამები და ბუღალტერია',
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    },
    {
      'trainigName': ' კულინარია, მზარეული',
      'locationName': 'თბილისი',
      'locationUnitName': 'ვაკე'
    }
  ],
  'desirableSalary': 5000,
  'fullTime': true,
  'partTime': true,
  'shiftBased': true,
  'interestedInInternship': true,
  'interestedToBeVolunteer': true,
  'interestedInTemporaryJob': true,
  'interestedInDangerousJob': true,
  'interestedInTraining': true,
  'unemployed': false,
  'useMediationService': true
}]

const testJobs = [{
  'positionName': 'JavaScript Developer',
  'organization': 'შპს FX1',
  'organizationTaxCode': '123456789',
  'locationName': 'თბილისი',
  'locationUnitName': 'ისანი',
  'addressLine': 'დამატებითი მისამართი',
  'publishDate': '2017-12-03T00:00:00',
  'interviewSupposedStartDate': '2018-01-01T00:00:00',
  'endDate': '2018-01-07T00:00:00',
  'dateLastChanged': '2017-12-03T19:32:24.0343829+04:00',
  'useMediationService': true,
  'vacantPlacesQuantity': 2,
  'functionsDescription': 'blablablabla',
  'additionalDescription': 'damatebiti informacia TEST TEST',
  'averageSalaryName': '150-300',
  'fullTime': true,
  'partTime': true,
  'shiftBased': true,
  'formalEducationLevelName': 'უმაღლესი - ბაკალავრი',
  'formalEducationLevelId': '3',
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
  'languages': [
    {
      'languageName': 'აფხაზური'
    },
    {
      'languageName': 'ქართული'
    }
  ],
  'skills': [
    {
      'skillName': 'Javascript'
    },
    {
      'skillName': 'CSS'
    }
  ]
}]

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
        { locationUnitName: 'სამგორი' }
      ]
    },
    {
      locationName: 'გურია',
      units: [
        { locationUnitName: 'ოზურგეთი' },
        { locationUnitName: 'ლანჩხუთი' },
        { locationUnitName: 'ჩოხატაური' }
      ]
    },
    {
      locationName: 'რაჭა-ლეჩხუმი & ქვემო სვანეთი',
      units: [
        { locationUnitName: 'ამბროლაური' },
        { locationUnitName: 'ლენტეხი' },
        { locationUnitName: 'ონი' },
        { locationUnitName: 'ცაგერი' }
      ]
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
        { locationUnitName: 'ყვარლი' }
      ]
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
        { locationUnitName: 'ხონი' }
      ]
    },
    {
      locationName: 'მცხეთა-მთიანეთი  ',
      units: [
        { locationUnitName: 'ახალგორი' },
        { locationUnitName: 'დუშეთი' },
        { locationUnitName: 'თიანეთი' },
        { locationUnitName: 'მცხეთა' },
        { locationUnitName: 'ყაზბეგი' }
      ]
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
        { locationUnitName: 'ხობი' }
      ]
    },
    {
      locationName: 'სამცხე-ჯავახეთი',
      units: [
        { locationUnitName: 'ადიგენი' },
        { locationUnitName: 'ასპინძა' },
        { locationUnitName: 'ახალქალაქი' },
        { locationUnitName: 'ახალციხე' },
        { locationUnitName: 'ბორჯომი' },
        { locationUnitName: 'ნინოწმინდა' }
      ]
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
        { locationUnitName: 'წალკის' }
      ]
    },
    {
      locationName: 'შიდა ქართლი ',
      units: [
        { locationUnitName: 'გორი' },
        { locationUnitName: 'კასპი' },
        { locationUnitName: 'ქარელი' },
        { locationUnitName: 'ხაშური' }
      ]
    },
    {
      locationName: 'აჭარის ავტონომიური რესპუბლიკა',
      units: [
        { locationUnitName: 'ბათუმი' },
        { locationUnitName: 'ქედა' },
        { locationUnitName: 'ქობულეთი' },
        { locationUnitName: 'შუახევი' },
        { locationUnitName: 'ხელვაჩაური' },
        { locationUnitName: 'ხულო' }
      ]
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
        { locationUnitName: 'ტყვარჩელი' }
      ]
    }

  ]
}]

const testEducationTypes = [
  { name: 'უმაღლესი განათლება' },
  { name: 'პროფესიული განათლება' },
  { name: 'უმაღლესი/პროფესიული სასწავლებლის სტუდენტი' },
  { name: 'ტრენინგები' },
  { name: 'არაფორმალური განათლება' }
]

const testEducationLevels = [
  { name: 'ბაკალავრი' },
  { name: 'მაგისტრი' },
  { name: 'მაგისტრთან გათანაბრებული' },
  { name: 'დოქტორი' }
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
  { name: 'oop' }
]

async function seedData(data, index, indexOption, type, dropIndexIfExists = false) {
  try {
    let exists = await client.indices.exists({ index: index })

    if (dropIndexIfExists === true && exists === true) {
      await deleteIndex(index)
    }

    if (!exists) {
      await createIndex(index, indexOption)
    }

    await insertData(index, type, data)
  } catch (error) {
    console.error(error)
  }
}

seedData(testUsers, 'user', userIndex, 'user', true)
seedData(testJobs, 'job', jobIndex, 'job', true)
seedData(testLibs, 'lib', libIndex, 'location', true)
seedData(testEducationTypes, 'educationtype', indexDefaultOptions, 'educationType', true)
seedData(testEducationLevels, 'educationlevel', indexDefaultOptions, 'educationLevel', true)
seedData(testSkills, 'skill', skillIndex, 'skill', true)
