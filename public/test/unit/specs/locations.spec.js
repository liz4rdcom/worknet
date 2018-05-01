import { mount, createLocalVue } from '@vue/test-utils'
import locations from '@/components/common/locations'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('locations component', () => {
  it('should change dropdown values when currentLocationName and currentLocationUnitName props change', () => {
    let locationsProp = [
      {
        locationName: 'თბილისი',
        units: [
          {
            locationUnitName: 'ვაკე',
          },
          {
            locationUnitName: 'ისანი',
          },
        ],
      },
      {
        locationName: 'გურია',
        units: [
          {
            locationUnitName: 'ოზურგეთი',
          },
          {
            locationUnitName: 'ლანჩხუთი',
          },
        ],
      },
    ]

    let props = {
      locations: locationsProp,
      currentLocationName: 'თბილისი',
      currentLocationUnitName: 'ვაკე',
    }

    const wrapper = mount(locations, {propsData: props, localVue})

    wrapper.setProps(props)

    props.currentLocationName = 'გურია'
    props.currentLocationUnitName = 'ოზურგეთი'

    wrapper.setProps(props)

    expect(wrapper.find('.custom-select:first-child').element.value)
      .toEqual('გურია')

    expect(wrapper.find('.custom-select:last-child').element.value).toEqual('ოზურგეთი')
  })
})
