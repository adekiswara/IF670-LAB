import { IonRouterOutlet, IonTabBar, IonTabs } from "@ionic/react"
import { Redirect, Route } from "react-router"
import Mail from "./Mail";
import Meet from "./Meet";

const MailTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                <Route exact path="/tabs/mail" component={Mail} />
                <Route exact path="/tabs/meet" component={Meet} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom"></IonTabBar>
        </IonTabs>
    );
};

export default MailTabs;