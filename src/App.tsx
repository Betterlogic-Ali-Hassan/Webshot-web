import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

import SubscriptionPage from "./pages/SubscriptionPage";
import SupportPage from "./pages/SupportPage";
import Billing from "./components/subscription/billing/Billing";
import { ModalProvider } from "./context/ModalsContext";
import { ScreenShotProvider } from "./context/ScreenShotContext";
import ScreenShotManager from "./components/screenShotManager/ScreenShotManager";
import SingleScreenshot from "./components/singleScreenshotPage/SingleScreenshot";
import { ImageEditorProvider } from "./context/ImageContext";
function App() {
  return (
    <ImageEditorProvider>
      <ModalProvider>
        <ScreenShotProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<ScreenShotManager />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/subscription' element={<SubscriptionPage />} />
              <Route path='/support' element={<SupportPage />} />
              <Route path='/billing' element={<Billing />} />
              <Route path='/s/:id' element={<SingleScreenshot />} />
            </Routes>
          </BrowserRouter>
        </ScreenShotProvider>
      </ModalProvider>
    </ImageEditorProvider>
  );
}

export default App;
