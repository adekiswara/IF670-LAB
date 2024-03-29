import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { LoadScript } from '@react-google-maps/api';

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

import NewMemory from './pages/NewMemory';
import Tabs from './components/Tabs';

const App: React.FC = () => {

  return (
    <IonApp>
      <LoadScript googleMapsApiKey={"AIzaSyBRVFB3oh7NR6S-BHHiWWgt3j2efMIMCiE"}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/tabs" component={Tabs} />
            <Route path="/new-memory" component={NewMemory} />
            <Redirect exact from="/" to="/tabs" />
          </IonRouterOutlet>
        </IonReactRouter>
      </LoadScript>
    </IonApp>
  );
};


export default App;
