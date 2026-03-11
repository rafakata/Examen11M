const btn = document.getElementById('btnAuth');

if (btn) {
  btn.onclick = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Acceso Administrador',
      html:
        '<input id="sw-user" class="swal2-input" placeholder="Usuario">' +
        '<input id="sw-pass" type="password" class="swal2-input" placeholder="Contrasena">',
      showCancelButton: true,
      confirmButtonText: 'Entrar',
      preConfirm: () => [
        document.getElementById('sw-user').value,
        document.getElementById('sw-pass').value,
      ],
    });

    if (formValues) {
      const [username, password] = formValues;
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const resData = await response.json();

      if (resData.ok) {
        Swal.fire('Bienvenido', 'Login ejecutado correctamente', 'success').then(() =>
          location.reload()
        );
      } else {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      }
    }
  };
}
