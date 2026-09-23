import { Route, Routes } from "react-router";

import { SiteLayout } from "./components/layout/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DesignSystem } from "./pages/DesignSystem";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ThinkingDetailPage } from "./pages/ThinkingDetailPage";
import { ThinkingPage } from "./pages/ThinkingPage";
import { WorkDetailPage } from "./pages/WorkDetailPage";
import { WorkPage } from "./pages/WorkPage";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />

        <Route path="work">
          <Route index element={<WorkPage />} />
          <Route path=":slug" element={<WorkDetailPage />} />
        </Route>

        <Route path="thinking">
          <Route index element={<ThinkingPage />} />
          <Route path=":slug" element={<ThinkingDetailPage />} />
        </Route>

        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="design-system" element={<DesignSystem />} />
      </Route>
    </Routes>
  );
}

export default App;
