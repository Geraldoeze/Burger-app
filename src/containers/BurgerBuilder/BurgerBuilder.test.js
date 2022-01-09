import { BurgerBuilder} from "./BurgerBuilder"
import React from "react";

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import BuildControls from '../../Comps/Burger/BuildControls/BuildControls'

Enzyme.configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />)
    })

    it('should render <BuildControls /> when recieving ingredients', ()=>{
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})  