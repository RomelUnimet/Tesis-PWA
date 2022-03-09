import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { RegisterScreen } from "../../../components/auth/RegisterScreen";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <RegisterScreen/>
    </Provider>
)

describe('Pruebas Register Screen', () => { 

    test('should render the register component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })