import HeaderComponent from "@/components/partials/Header";
import SiderComponent from "@/components/partials/Sider";
import BreadcrumbComponent from "@/components/partials/Breadcrumb";
import ContentComponent from "@/components/partials/Content";
import { Layout } from "antd";

export default function LayoutPage({ children }){
    return(
        <Layout>
            <HeaderComponent/>
            <Layout>
                <SiderComponent/>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <BreadcrumbComponent/>
                    <ContentComponent>
                        {children}
                    </ContentComponent>
                </Layout>
            </Layout>
        </Layout>
    )
}