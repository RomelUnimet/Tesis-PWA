import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { DeleteConfirm } from "../../../components/modals/DeleteConfirm";
import { ProfileAllWeathers } from "../../../components/profile/ProfileAllWeathers";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <ProfileAllWeathers allWeathers={[]} />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })