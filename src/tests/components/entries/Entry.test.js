import { mount, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Entry } from "../../../components/entries/Entry";


configure({ adapter: new Adapter() })


const wrapper = mount(
    <Provider store={store}>
        <Entry
            fullscreen={false}
            setfullscreen={()=>{}} 
            setEditModalState={()=>{}} 
            swiperRef={null}
            entry={{
                eid:"8c510ed8-6a72-4f90-a5ce-8a6c2ca70beb",
                cid:"40eea0df-c8f5-4331-8442-761413489771",
                uid:"6206bbb958922200161ea0c3",
                photos:[],
                date: new Date("2022-03-02T15:01:14.255Z"),
                title:"",
                text:"",
                weather:"none",
                tags:[],
                location:"",
                trash:false
            }}
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })