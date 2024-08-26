import {Routes, Route} from 'react-router-dom'
import Room from "../Pages/Room/Room.jsx";
import RoomQRCode from "../Pages/Room-QRCOde.jsx";
import RoomLayout from "../Layouts/RoomLayout.jsx";
import {PlayerContextProvider} from "../Context/RoomContext.jsx";
function Router(){
    return(
        <PlayerContextProvider>
            <Routes>
                <Route path="/room/:id" element={<RoomLayout/>}>
                    <Route path="/room/:id" element={<Room />}/>
                </Route>
                <Route path="/sala/:id" element={<RoomQRCode />}/>
            </Routes>
        </PlayerContextProvider>
    )
}

export default Router