import defineStore from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
  }),
  getters: {
    user: (state) => state.authUser,
  },
  actions: {
    getToken() {
      sessionStorage.getItem("token");
    },
    async handleLogin(data) {
      await axios
        .post("/user/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          sessionStorage.setItem("token", JSON.stringify(res.data.data));
          this.router.push("/");
        });
    },
  },
});
