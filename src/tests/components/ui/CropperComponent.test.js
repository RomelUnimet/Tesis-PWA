import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CardPickerModal } from "../../../components/modals/CardPickerModal";
import { CropperComponent } from "../../../components/ui/CropperComponent";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <CropperComponent 
        cropperState={{show:true, img:'' }}
        setCropperState={()=>{}} />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })