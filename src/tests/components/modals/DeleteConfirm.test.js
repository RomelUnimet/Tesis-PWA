import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DeleteConfirm } from "../../../components/modals/DeleteConfirm";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <DeleteConfirm/>
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })