import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ConfirmModal } from "../../../components/modals/ConfirmModal";
import { ProfileAllTags } from "../../../components/profile/ProfileAllTags";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <ProfileAllTags/>
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })