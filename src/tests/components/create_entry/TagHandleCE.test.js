import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { TagHandleCE } from "../../../components/create_entry/TagHandleCE";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <TagHandleCE
          handlerState={{show:true}}
          setHandlerState={()=>{}} 
          tagsCE={'TAG'}
          setTagsCE={()=>{}}
        />
    </Provider>
)

describe('Pruebas Location Handler', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })