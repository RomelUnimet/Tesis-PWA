import { shallow, configure } from "enzyme"
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { EditEntryModal } from "../../../components/entries/EditEntryModal";


configure({ adapter: new Adapter() })


const wrapper = shallow(
    <Provider store={store}>
        <EditEntryModal
            entries={[{
                eid:"8c510ed8-6a72-4f90-a5ce-8a6c2ca70beb",
                cid:"40eea0df-c8f5-4331-8442-761413489771",
                uid:"6206bbb958922200161ea0c3",
                photos:[],
                date: "2022-03-02T15:01:14.255Z",
                title:"",
                text:"",
                weather:"none",
                tags:[],
                location:"",
                trash:false
            },
            {
                eid:"8c510ed8-6a72-4f90-a5ce-8a6c2ca70beb",
                cid:"40eea0df-c8f5-4331-8442-761413489771",
                uid:"6206bbb958922200161ea0c3",
                photos:[],
                date: "2022-03-02T15:01:14.255Z",
                title:"",
                text:"",
                weather:"none",
                tags:[],
                location:"",
                trash:false
            }]}
            entrySwiperState={{
                show:true,
                activeEntry:0
            }}
            setEntrySwiperState={()=>{}}
           
           
        />
    </Provider>
)

describe('Pruebas Create Modal', () => { 

    test('should render the  component', async () => { 

        expect(wrapper).toMatchSnapshot()        
     })

 })