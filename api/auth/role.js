// exports.IsAdmin = async (req, res, next) => {
//     if (req.user.role === "admin") {
//       next();
//     }
//     return res.status(401).send("Forbidden! You are Not Customer");   
// }
// exports.IsKasir = async (req, res, next) => {
//     if (req.user.role === "kasir") {
//         next();
//     }
//     return res.status(401).send("Forbidden! You are Not Admin ");
// }
// exports.IsOwner = async (req, res, next) => {
//     if (req.user.role === "owner") {
//         next();
//     }
//     return res.status(401).send("Forbidden! You are Not Admin ");
// }
// exports.IsAdminKasir = async (req, res, next) => {
//     if (req.user.role === "admin" || req.user.role === "kasir") {
//         next();
//     }
//     return res.status(401).send("Forbidden! You are Not Admin ");
// }

// Untuk Kasir
exports.IsKasir = async (req, res, next) => {
    if (req.user.role === "kasir") {
       next();
    } else {
       return res.status(401).send("Anda bukan Kasir")
    }
}

// Untuk Admin
exports.IsAdmin = async (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        return res.status(401).send("Anda bukan Admin")
    }
}

// Untuk Owner
exports.IsOwner = async (req, res, next) => {
    if (req.user.role === "owner") {
        next();
    } else {
        return res.status(401).send("Anda bukan Owner")
    }
}

// Untuk Admin dan Kasir (Jadi satu)
exports.IsAdminKasir = async (req, res, next) => {
    if (req.user.role === "admin","kasir") {
        next();
    } else {
        return res.status(401).send("Anda bukan Admin atau Kasir")
    }
}