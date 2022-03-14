import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CEModal } from "../../../components/modals/CEModal";
import { ProfileAllPhotos } from "../../../components/profile/ProfileAllPhotos";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <ProfileAllPhotos allImg={["","","","","",""]} />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })