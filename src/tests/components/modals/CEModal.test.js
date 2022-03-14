import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CEModal } from "../../../components/modals/CEModal";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <CEModal
        modalState={{show:true}} 
        setModalState={()=>{}} 
        selectedWeather={'cloud'} 
        setSelectedWeather={()=>{}} 
        tagsCE={false}
        setTagsCE={()=>{}} 
        locationCE={false} 
        setLocationCE={()=>{}}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })