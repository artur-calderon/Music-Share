import React from 'react';
import {LaptopOutlined,NotificationOutlined, UserOutlined } from '@ant-design/icons'
import {  Menu } from 'antd';
function AsideMenu(){



    const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    });
    return(
        <>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                        height: '100%',
                    }}
                    items={items2}
                />




        </>

        // <AsideContainer>
        //
        // </AsideContainer>
    )
}
export default AsideMenu;