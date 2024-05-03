import { FilterAPI, HomeAPI, SearchAPI, MovieAPI, PlanAPI, ProfileAPI } from './apis/apis';
import App from './app';

const apis = [new HomeAPI() , new FilterAPI(), new SearchAPI(), new MovieAPI(), new PlanAPI(), new ProfileAPI()]

const app = new App(apis);

app.listen();