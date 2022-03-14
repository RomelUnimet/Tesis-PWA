import { shallow, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CEModal } from "../../../components/modals/CEModal";
import { TrashScreen } from "../../../components/settings/trash/TrashScreen";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/example/path"
    })
  }));

configure({ adapter: new Adapter() })

const wrapper = shallow(
    <Provider store={store}>
        <TrashScreen/>
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })