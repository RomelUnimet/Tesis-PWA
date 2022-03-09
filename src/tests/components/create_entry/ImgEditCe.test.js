import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ImgEditCE } from "../../../components/create_entry/ImgEditCE";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <ImgEditCE
            imgEditorState={[]}
            setImgEditorState={()=>{}}
            entryImgState={[]}
            setEntryImgState={()=>{}}
            removeImgInEditor={()=>{}}
            addImg={()=>{}}
            imgInput={null}
            swiperRef={null}
            setImgInSwiperState={()=>{}}
            
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })