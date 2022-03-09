import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { LocHandleCE } from "../../../components/create_entry/LocHandleCE";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <LocHandleCE
          handlerState={{show:true}}
          setHandlerState={()=>{}} 
          locationCE={'LOCATION'}
          setLocationCE={()=>{}}
        />
    </Provider>
)

describe('Pruebas Location Handler', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })