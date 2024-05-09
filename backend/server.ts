import {
    FilterAPI,
    HomeAPI,
    SearchAPI,
    MovieAPI,
    PlanAPI,
    ProfileAPI,
    LoginAPI,
    RegisterAPI,
    CommentAPI,
    RatingAPI,
    PasswordAPI,
} from "./apis/apis";
import App from "./app";

const apis = [
    new HomeAPI(),
    new FilterAPI(),
    new SearchAPI(),
    new MovieAPI(),
    new PlanAPI(),
    new ProfileAPI(),
    new LoginAPI(),
    new RegisterAPI(),
    new CommentAPI(),
    new RatingAPI(),
    new PasswordAPI(),
];

const app = new App(apis);

app.listen();
