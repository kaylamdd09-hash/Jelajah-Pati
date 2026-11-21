const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const readline = require("readline/promises");
const { stdin, stdout } = require("process");

// =====================================
// 1. INISIALISASI FIREBASE ADMIN
// =====================================

const serviceAccount = require(
    "C:/firebase-keys/serviceAccountKey.json"
);

initializeApp({
    credential: cert(serviceAccount)
});

const auth = getAuth();
const db = getFirestore();

// =====================================
// 2. MEMILIH AKUN YANG AKAN DIJADIKAN ADMIN
// =====================================

async function jadikanAdmin() {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout
    });

    try {
        const email = await rl.question(
            "Masukkan email akun yang akan dijadikan Admin: "
        );

        const user = await auth.getUserByEmail(email.trim());

        const userRef = db.collection("users").doc(user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            console.log("Data pengguna tidak ditemukan di Firestore.");
            return;
        }

        console.log("\nAkun yang dipilih:");
        console.log("Email:", user.email);
        console.log("Nama:", userDoc.data().nama);
        console.log("UID:", user.uid);

        const konfirmasi = await rl.question(
            "\nJadikan akun ini sebagai Admin? Ketik YA untuk melanjutkan: "
        );

        if (konfirmasi.trim() !== "YA") {
            console.log("Proses dibatalkan.");
            return;
        }

        // =====================================
        // 3. MEMBERIKAN CUSTOM CLAIMS ADMIN
        // =====================================

        const customClaims = user.customClaims || {};

        await auth.setCustomUserClaims(user.uid, {
            ...customClaims,
            admin: true
        });

        // =====================================
        // 4. MENGUBAH ROLE DI FIRESTORE
        // =====================================

        await userRef.update({
            role: "admin"
        });

        console.log("\nBerhasil! Akun sekarang memiliki hak Admin.");
        console.log("Silakan login ulang untuk memperbarui token.");

    } catch (error) {
        console.error("\nGagal memberikan hak Admin:", error.message);
    } finally {
        rl.close();
    }
}

jadikanAdmin();