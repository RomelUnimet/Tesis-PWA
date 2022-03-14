import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { UpdateCardModal } from "../../../components/modals/UpdateCardModal";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <UpdateCardModal 
            modalState={{show:false, card:{}}}
            setModalState={()=>{}} 
            cropperState={{show:false}}
            setCropperState={()=>{}}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })