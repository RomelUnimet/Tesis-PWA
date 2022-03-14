import { shallow, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { HandlerMenuModal } from "../../../components/modals/HandlerMenuModal";
import { ProfileScreen } from "../../../components/profile/ProfileScreen";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/example/path"
    })
  }));

configure({ adapter: new Adapter() })

const wrapper = shallow(
    <Provider store={store}>
        <ProfileScreen/>
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })