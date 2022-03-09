import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ImgCarrousel } from "../../../components/create_entry/ImgCarrousel";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <ImgCarrousel
            entryImgState={[]}
            setEntryImgState={()=>{}}
            setImgInputIsEmpty={()=>{}}
            fullscreen={false}
            setfullscreen={()=>{}}
            isEdit={false}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })