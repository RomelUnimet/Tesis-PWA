import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CardPickerModal } from "../../../components/modals/CardPickerModal";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <CardPickerModal 
            modalState={{
                show:true,
                month:0,
                year:2022
            }} 
            setModalState={()=>{}} 
            navigateCard={()=>{}}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })