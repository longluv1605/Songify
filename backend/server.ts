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
    LogoutAPI,
    ForgotPasswordAPI,
    AdminLoginAPI,
    AdminLogoutAPI,
    AdminMovieAPI,
    AdminUserAPI,
    AdminProfileAPI,
    AdminSaleAPI,
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
    new LogoutAPI(),
    new ForgotPasswordAPI(),
    new AdminLoginAPI(),
    new AdminLogoutAPI(),
    new AdminMovieAPI(),
    new AdminUserAPI(),
    new AdminProfileAPI(),
    new AdminSaleAPI(),
];

const app = new App(apis);

app.listen();
