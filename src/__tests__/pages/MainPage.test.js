import React from 'react';
// import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import MainPage from '../../pages/MainPage';

describe('Main Page', () => {
  
  it('Should render', () => { 
    // const Wrapper = shallow(<MainPage />);
    // expect(Wrapper).toBeTruthy();

    const wrapper = mount(<MainPage />);
    expect(wrapper).toMatchSnapshot();
  })

});
