import jwt from "jsonwebtoken";
import { X_HEADER_USER_ID } from "./constant";
const JWT_SECRET = process.env.JWT_SECRET;

// export function verifyJWT(req) {
//     try {
//         const token = req.cookies.get("token")?.value;
//         if (!token) {
//             return null;
//         }
//         const decoded = jwt.verify(token, JWT_SECRET);
//         return decoded;
//     } catch (err) {
//         console.log("==>Verify Token Exception");
//         console.log(err);
//         return null;
//     }
// }
export function verifyJWT(req) {
    try {
        let token = req.cookies.get("token")?.value;

        if (!token) {
            const cookieHeader = req.headers.get("cookie");

            if (cookieHeader) {
                const cookies = cookieHeader.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();

                    if (cookie.startsWith("token=")) {
                        token = cookie.substring(6);
                        break;
                    }
                }
            }
        }

        console.log("==> Token exists:", !!token);

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        console.log("==> JWT decoded:", decoded);

        return decoded;
    } catch (err) {
        console.log("==>Verify Token Exception");
        console.log(err);
        return null;
    }
}
export function isAdmin(request) {
    const headers = request.headers;
    const userId = Number(headers.get(X_HEADER_USER_ID));
    return userId == -1;
}

