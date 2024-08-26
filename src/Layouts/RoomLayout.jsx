import AsideMenu from "../Components/aside/AsideMenu.jsx";
import Main from "../Components/main/Main.jsx";
import {ConfigProvider, Layout} from "antd";
import {Outlet} from "react-router-dom";

function RoomLayout(){
 const {Header, Sider,Content} = Layout

    return(
        <ConfigProvider
            theme={{
                components:{
                  Layout:{
                  },
                }
            }}
        >
            <Layout>
                <Header>
                    <h1>Header</h1>
                </Header>

                <Content>
                    {/*<Layout>*/}
                    {/*    <Sider>*/}
                    {/*        /!*<AsideMenu></AsideMenu>*!/*/}
                    {/*        <Outlet/>*/}
                    {/*    </Sider>*/}
                    {/*    <Content>*/}
                    {/*        /!*<Main></Main>*!/*/}
                    {/*        <Outlet/>*/}
                    {/*    </Content>*/}
                    {/*    <Sider>*/}
                    {/*        <AsideMenu></AsideMenu>*/}
                    {/*    </Sider>*/}
                    {/*</Layout>*/}
                    <Outlet/>
                </Content>

            </Layout>
        </ConfigProvider>
    )
}

export default RoomLayout;