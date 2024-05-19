import App from "./app";
import SignInAPI from "./apis/signin.api";
import SignOutAPI from "./apis/signout.api";
import SignUpAPI from "./apis/signup.api";
import HomeAPI from "./apis/home.api";
import PlanAPI from "./apis/plan.api";
import MovieAPI from "./apis/movie.api";
import SearchAPI from "./apis/search.api";
import FilterAPI from "./apis/filter.api";
import PasswordAPI from "./apis/password.api";
import ProfileAPI from "./apis/profile.api";
import UserManageAPI from "./apis/admin/user_manage.api";
import MovieManageAPI from "./apis/admin/movie_manage.api";
import SaleManageAPI from "./apis/admin/sale_manage.api";

const apis = [
    SignInAPI,
    SignOutAPI,
    SignUpAPI,
    HomeAPI,
    PlanAPI,
    MovieAPI,
    SearchAPI,
    FilterAPI,
    PasswordAPI,
    ProfileAPI,
    UserManageAPI,
    MovieManageAPI,
    SaleManageAPI,
];

const app = new App(apis);

app.listen();
