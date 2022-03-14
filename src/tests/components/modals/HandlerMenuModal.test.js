import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { HandlerMenuModal } from "../../../components/modals/HandlerMenuModal";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <HandlerMenuModal
            modalState={{show:true}}
            setModalState={()=>{}}
            setUpdateInputModal={()=>{}}
            setDeleteModal={()=>{}}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })