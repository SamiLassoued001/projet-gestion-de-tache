import Dashboards from "./Dashboards";
import WeeklyMeetingPlannerWithDates from './DashLine'
import DashMeetingBarNivo from './Dash'

function DashCollection(){
return(
    <>
    <Route path="/Dash" element={<Dash />} />
    <Route path="/DashLine" element={<DashLine />} />
    <Route path="/Dashboards" element={<Dashboards />} />

    
    
    </>

)
}
export default DashCollection;