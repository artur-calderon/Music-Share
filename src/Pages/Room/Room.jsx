import Main from "../../Components/main/Main.jsx";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Layout} from "antd";
import AsideMenu from "../../Components/aside/AsideMenu.jsx";
import AsidePlaylist from "../../Components/AsidePlaylist/AsidePlaylist.jsx";
import {io} from 'socket.io-client'
import {PlayerContext} from "../../Context/RoomContext.jsx";


function Room() {
  const socket = io('http://192.168.2.21:3001');
  const {id} = useParams();
  const {getInfoRoom,addMusicToPlaylist} = useContext(PlayerContext);
  const [userInfo, setUserInfo] = useState({})
  // const [roomInfo, setRoomInfo] = useState({
  //     roomSpecs:{
  //         autor:" ",
  //         genero:" ",
  //         name:" "
  //     }
  // });

    const {Sider} = Layout

  useEffect(() => {
      getInfoRoom(id)
      setUserInfo({
          idRoom:id,
          userName:'Admin',
          UserCpf:'123124124124'
      })
      socket.emit('joinRoom',{
          idRoom:id,
          userName:'Admin',
          UserCpf:'123124124124'
      })
}, [id, ioMusic()]);


    function ioMusic(){
        socket.on('musicSelected',data => {
            console.log(data)
            addMusicToPlaylist(data)
        })
    }





    return(
        <Layout>
         <Sider>
             <AsideMenu></AsideMenu>
         </Sider>
            <Main></Main>
         <Sider width={500} >
             <AsidePlaylist></AsidePlaylist>
         </Sider>
        </Layout>
    )
}
export default Room;