import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { EntryImgGallery } from "../../../components/entries/EntryImgGallery";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <EntryImgGallery
            images={['1','2']}
            fullscreen={true} 
            setfullscreen={()=>{}}
            prevswiperRef={null}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })