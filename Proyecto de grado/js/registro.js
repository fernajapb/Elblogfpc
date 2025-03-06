// 🔥 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhkRRMR96ckghD_s1E6W1_nv5z4Y0tonY",
  authDomain: "ebfpc-c082b.firebaseapp.com",
  projectId: "ebfpc-c082b",
  storageBucket: "ebfpc-c082b.appspot.com",
  messagingSenderId: "601435476584",
  appId: "1:601435476584:web:577d0b5287a24fd26a21dd",
  measurementId: "G-K4Q68FM6ZT",
};

// ✅ Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🎯 Función para registrar un usuario
function registerUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("⚠️ Por favor, completa todos los campos.");
    return;
  }

  db.collection("usuarios")
    .doc(username)
    .set({ password })
    .then(() => {
      alert("✅ Usuario registrado con éxito.");
      window.location.href = "Index.html"; // Redirigir al login
    })
    .catch((error) => {
      console.error("❌ Error al registrar:", error);
      alert("Error al registrar usuario.");
    });
}

// 🔐 Función para iniciar sesión
function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    alert("⚠️ Completa todos los campos.");
    return;
  }

  db.collection("usuarios")
    .doc(username)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        if (userData.password === password) {
          alert("✅ Inicio de sesión exitoso.");

          // Guardar el nombre del usuario en localStorage
          localStorage.setItem("username", username);

          // Redirigir a la página principal
          window.location.href = "Home.html";
        } else {
          alert("❌ Contraseña incorrecta.");
        }
      } else {
        alert("❌ Usuario no encontrado.");
      }
    })
    .catch((error) => {
      console.error("❌ Error al iniciar sesión:", error);
      alert("Error al iniciar sesión.");
    });
}
