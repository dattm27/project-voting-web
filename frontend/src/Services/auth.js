// const AUTH_API = "http://localhost:3000";
import endPointConfig from "./endPointConfig";
const AUTH_API = endPointConfig.endpoints.auth;
import { get, post } from "./api";
import { avalancheFuji } from "thirdweb/chains";
import instance from "./AxiosInstance";
export const getLoginPayload = async (params) => {
    const url = endPointConfig.endpoints.auth;
    console.log(" param get url " + window.location.hostname);
    return instance.get(
        endPointConfig.endpoints.auth, {
        params: {
            address: params.address,
            chainId: params.chainId,
            domain: `${window.location.hostname}:3333`,
        },
    });
};

export const doLogin = async (params) => {
    console.log("params", params);

    
    await instance.post(
        endPointConfig.endpoints.auth,
        params,
    );
};

export const isLoggedIn = async () => {
    return await instance.get({
        url: `${endPointConfig.endpoints.auth}/isLoggedIn`,
    });
};

export const doLogout = async () => {
    await instance.post({
        url: `${endPointConfig.endpoints.auth}/logout`,
    });
};