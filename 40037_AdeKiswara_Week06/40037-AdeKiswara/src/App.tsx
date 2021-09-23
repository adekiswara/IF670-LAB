import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, mailOutline, settings, videocamOutline, warning} from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Mail from './pages/Mail';
import MailDetail from './pages/MailDetail';
import Meet from './pages/Meet';
import MailTabs from './pages/MailTabs';
import Spam from './pages/Spam';
import Settings from './pages/Settings';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              IonMail
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem button routerLink="/tabs/mail">
                <IonIcon slot="start" icon={list} />
                <IonLabel>All Mail</IonLabel>
              </IonItem>
              <IonItem button routerLink="/spam">
                <IonIcon slot="start" icon={warning} />
                <IonLabel>Spam</IonLabel>
              </IonItem>
              <IonItem button routerLink="/settings">
                <IonIcon slot="start" icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonTabs>
        <IonRouterOutlet id="main">
          <Route exact path="/mail" component={Mail} />
          <Route path="/mail/:mailId" component={MailDetail} />
          <Route exact path="/meet" component={Meet} />
          <Route path="/tabs" component={MailTabs} />
          <Route exact path="/spam" component={Spam} />
          <Route exact path="/settings" component={Settings} />
          <Redirect exact from="/" to="/mail" />
          <Redirect exact from="/" to="/tabs" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="mail" href="/mail">
            <IonIcon icon={mailOutline} />
            <IonLabel>Mail</IonLabel>
          </IonTabButton>

          <IonTabButton tab="meet" href="/meet">
            <IonIcon icon={videocamOutline} />
            <IonLabel>Meet</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
