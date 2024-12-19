// const AUTH_API = "http://localhost:3000";
import endPointConfig from "./endPointConfig";
const AUTH_API = "https://auth-server-1lft.onrender.com";
import { get, post } from "./api";
import { avalancheFuji } from "thirdweb/chains";
export const getLoginPayload = async (params) => {
    return get({
        url: `${AUTH_API}/login`,
        params: {
            address: params.address,
            chainId: avalancheFuji.id.toString(),
        },
    });
};

export const doLogin = async (params) => {
    await post({
        url: `${AUTH_API}/login`,
        params,
    });
};

export const isLoggedIn = async () => {
    return await get({
        url: `${AUTH_API}/isLoggedIn`,
    });
};

export const doLogout = async () => {
    await post({
        url: `${AUTH_API}/logout`,
    });
};