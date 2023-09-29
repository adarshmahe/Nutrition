import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../modules/home/home.jsx';
import Navbar from '../modules/home/navbar/navbar.jsx';
import Learnings from '../modules/gotfl/pages/learnings/learnings.jsx';
import ConceptAi from '../modules/concept-ai/concept-ai.jsx';
import Sustainability from '../modules/knowledge-hub/sustainability/main.jsx';
import Trends from '../modules/trends/pages/trends.jsx';
import MarTrends from '../modules/trends/pages/market-trend.jsx';
import MarketTrendSearchTikTok from '../modules/trends/pages/market-trend-search-tik-tok.jsx';
import ConsumerTrendTikTikResource from '../modules/trends/pages/consumer-trend-tik-tik-resource.jsx';
import SignOutMessage from '../components/profile/logout-page/logout-page.jsx';
import ConsumerTrendVideo from '../modules/trends/pages/consumer-trend-video-play.jsx';
import PopulationSegregation from '../modules/trends/pages/population-segregation.jsx';

import DrillDownTable from '../modules/trends/pages/drill-down-table.jsx';
import ConsumerTrendsInnovation from '../modules/trends/pages/trends-innovation.jsx';

import ConsumerBarChart from '../modules/trends/pages/barchart-trends.jsx';

import ConsumerTheater from '../modules/consumer-theater/consumer-theater.jsx';

import KnowledgeHubTree from '../modules/knowledge-hub-tree/knowledge-hub-tree.jsx';
import PlantBasedPage from '../modules/plant-based/index.jsx';
import MarketTrend from '../modules/trends/components/market-trend/market-trend.jsx';
import EmergingFoodSolution from '../modules/trends/pages/emerging-food-solution.jsx';
import FeelGood from '../modules/trends/pages/feel-good.jsx';
import ModernizedComfort from '../modules/trends/pages/modernized-comfort.jsx';
import LowWaste from '../modules/trends/pages/low-waste.jsx';
import Wild from '../modules/trends/pages/wild.jsx';
import Joyful from '../modules/trends/pages/joyful.jsx';
import Flavour from '../modules/trends/pages/flavour.jsx';
import Mindful from '../modules/trends/pages/mindful.jsx';

function NavRoutes({ userName }) {
  return (
    <Routes>
      <Route path="/" element={<Home userName={userName} />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route exact path="/conceptai" element={<ConceptAi />}></Route>
      <Route
        exact
        path="/frontlinetime"
        element={<Learnings userName={userName} />}
      ></Route>
      <Route
        exact
        path="/commercializing-sustainability"
        element={<Sustainability />}
      />
      <Route exact path="/trends-dial" element={<Trends />}></Route>
      <Route
        exact
        path="/market-trend-performance"
        element={<MarTrends />}
      ></Route>
      <Route
        exact
        path="/market-trend-search-tik-tok"
        element={<MarketTrendSearchTikTok />}
      ></Route>
      <Route exact path="/trends-category" element={<ConsumerBarChart />} />
      <Route exact path="/market-trend" element={<MarketTrend />} />
      <Route
        exact
        path="/consumer-trend"
        element={<ConsumerTrendTikTikResource />}
      ></Route>
      <Route
        exact
        path="/consumer-trends-innovations"
        element={<ConsumerTrendsInnovation />}
      ></Route>
      <Route
        exact
        path="/consumer-trend-video"
        element={<ConsumerTrendVideo />}
      ></Route>
      <Route
        exact
        path="/population-segregation"
        element={<PopulationSegregation />}
      ></Route>
      <Route
        exact
        path="/consumer-barchart"
        element={<ConsumerBarChart />}
      ></Route>
      <Route
        exact
        path="/drill-down-table"
        element={<DrillDownTable />}
      ></Route>

      <Route
        exact
        path="/consumertheater"
        element={<ConsumerTheater />}
      ></Route>
      <Route
        exact
        path="/emerging-food"
        element={<EmergingFoodSolution />}
      ></Route>
      <Route exact path="/feel-good-food" element={<FeelGood />}></Route>
      <Route
        exact
        path="/modernized-comfort-food"
        element={<ModernizedComfort />}
      ></Route>
      <Route exact path="/low-waste-menus" element={<LowWaste />}></Route>
      <Route exact path="/wild-pure" element={<Wild />}></Route>
      <Route exact path="/joyful-sharing" element={<Joyful />}></Route>
      <Route exact path="/flavour-contrasts" element={<Flavour />}></Route>
      <Route exact path="/mindful-proteins" element={<Mindful />}></Route>
      <Route exact path="/knowledge-tree" element={<KnowledgeHubTree />}></Route>
      <Route exact path="/plantbased" element={<PlantBasedPage />}></Route>

      <Route exact path="/logout" element={<SignOutMessage />}>
        {' '}
      </Route>
    </Routes>
  );
}

export default NavRoutes;
